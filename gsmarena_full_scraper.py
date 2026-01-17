#!/usr/bin/env python3
"""
GSMArena Full Scraper - Phase 1 & 2
====================================
Phase 1: URL Discovery (no Firecrawl credits)
- Scrape all brand listing pages to collect phone URLs
- Organize by brand for resumable progress

Phase 2: Detail Page Scraping (Firecrawl)
- Scrape each phone's detail page with Firecrawl /scrape endpoint
- Parse markdown to extract specs
- Save to local JSON (backup) and Supabase database

Rate Limit: 10 req/min (free tier) = 7 second delay between requests
"""

import os
import re
import json
import time
import requests
from datetime import datetime
from typing import Dict, List, Optional, Tuple
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables
load_dotenv()

# Configuration
FIRECRAWL_API_KEY = os.getenv('FIRECRAWL_API_KEY')
SUPABASE_URL = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
SUPABASE_SERVICE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

# Rate limiting
RATE_LIMIT_DELAY = 7  # 10 req/min = 1 per 6 sec, using 7 for safety
PROGRESS_REPORT_INTERVAL = 500  # Report every 500 phones

# GSMArena URLs
GSMARENA_BASE_URL = "https://www.gsmarena.com"
BRANDS_URL = f"{GSMARENA_BASE_URL}/makers.php3"

# Headers to mimic browser
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
}


class GSMArenaFullScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update(HEADERS)
        
        # Initialize Supabase client
        if SUPABASE_URL and SUPABASE_SERVICE_KEY:
            self.supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
            print(f"Supabase connected: {SUPABASE_URL}")
        else:
            self.supabase = None
            print("WARNING: Supabase not configured - will only save to local JSON")
        
        # Initialize Firecrawl
        if FIRECRAWL_API_KEY:
            from firecrawl import FirecrawlApp
            self.firecrawl = FirecrawlApp(api_key=FIRECRAWL_API_KEY)
            print("Firecrawl initialized")
        else:
            self.firecrawl = None
            print("WARNING: Firecrawl not configured")
        
        # Statistics
        self.stats = {
            'brands_discovered': 0,
            'phones_discovered': 0,
            'phones_scraped': 0,
            'phones_saved_to_db': 0,
            'errors': 0,
            'credits_used': 0,
            'start_time': None,
        }
        
        # Progress tracking
        self.progress_file = 'scraping_progress.json'
        self.urls_file = 'gsmarena_all_urls.json'
    
    # ==========================================
    # PHASE 1: URL DISCOVERY (Using Firecrawl to bypass rate limiting)
    # ==========================================
    
    def _scrape_url_with_firecrawl(self, url: str) -> Optional[str]:
        """Scrape a URL using Firecrawl and return markdown content"""
        if not self.firecrawl:
            print("ERROR: Firecrawl not configured")
            return None
        
        try:
            result = self.firecrawl.scrape(
                url,
                formats=['markdown'],
                timeout=120000,
                wait_for=30000,
            )
            
            self.stats['credits_used'] += 1
            
            # Firecrawl returns a Document object with markdown attribute
            if result and hasattr(result, 'markdown') and result.markdown:
                return result.markdown
            
            return None
            
        except Exception as e:
            print(f"  Firecrawl error: {e}")
            self.stats['errors'] += 1
            return None
    
    def discover_all_brands(self) -> List[Dict]:
        """Discover all brands from GSMArena makers page using Firecrawl"""
        print("\n" + "="*60)
        print("PHASE 1: URL DISCOVERY (Using Firecrawl)")
        print("="*60)
        print(f"\nFetching brands from {BRANDS_URL} using Firecrawl...")
        
        # Use Firecrawl to bypass rate limiting
        time.sleep(RATE_LIMIT_DELAY)
        markdown = self._scrape_url_with_firecrawl(BRANDS_URL)
        
        if not markdown:
            print("ERROR: Failed to fetch brands page with Firecrawl")
            return []
        
        brands = []
        
        # Parse markdown to extract brand info
        # Firecrawl format: [Samsung\<br>\<br>1450 devices](https://www.gsmarena.com/samsung-phones-9.php)
        # Also handle: [Samsung\\<br>\\<br>1450 devices](...)
        pattern = r'\[([^\]]+?)(?:\\?<br>\\?<br>|\s+)(\d+)\s+devices?\]\((https://www\.gsmarena\.com/[^)]+\.php)\)'
        matches = re.findall(pattern, markdown)
        
        for brand_name, phone_count, full_url in matches:
            # full_url is already complete: https://www.gsmarena.com/samsung-phones-9.php
            # Extract the relative path for slug
            href = full_url.replace('https://www.gsmarena.com/', '')
            brands.append({
                'name': brand_name.strip(),
                'phone_count': int(phone_count),
                'url': full_url,
                'slug': href.replace('-phones-', '_').replace('.php', ''),
            })
        
        self.stats['brands_discovered'] = len(brands)
        print(f"Discovered {len(brands)} brands (used 1 credit)")
        
        # Sort by phone count (most phones first)
        brands.sort(key=lambda x: x['phone_count'], reverse=True)
        
        # Print top 10 brands
        if brands:
            print("\nTop 10 brands by phone count:")
            for i, brand in enumerate(brands[:10], 1):
                print(f"  {i}. {brand['name']}: {brand['phone_count']} phones")
        
        return brands
    
    def discover_phones_for_brand(self, brand: Dict) -> List[Dict]:
        """Discover all phone URLs for a single brand using Firecrawl"""
        phones = []
        page = 1
        
        # GSMArena URL pattern:
        # Page 1: samsung-phones-9.php
        # Page 2+: samsung-phones-f-9-0-p2.php
        # Extract brand ID from URL (e.g., "9" from "samsung-phones-9.php")
        brand_url = brand['url']
        
        # Extract brand ID from URL pattern like "samsung-phones-9.php"
        brand_id_match = re.search(r'-phones-(\d+)\.php', brand_url)
        if not brand_id_match:
            print(f"    ERROR: Could not extract brand ID from {brand_url}")
            return phones
        
        brand_id = brand_id_match.group(1)
        # Extract brand name part (e.g., "samsung" from "https://www.gsmarena.com/samsung-phones-9.php")
        brand_name_match = re.search(r'gsmarena\.com/([a-z]+)-phones-', brand_url)
        brand_name_slug = brand_name_match.group(1) if brand_name_match else 'brand'
        
        max_pages = (brand['phone_count'] // 50) + 2  # Safety limit
        
        while page <= max_pages:
            if page == 1:
                url = brand_url
            else:
                # Correct pagination URL: samsung-phones-f-9-0-p2.php
                url = f"https://www.gsmarena.com/{brand_name_slug}-phones-f-{brand_id}-0-p{page}.php"
            
            print(f"    Scraping page {page}...")
            
            # Rate limiting for Firecrawl
            time.sleep(RATE_LIMIT_DELAY)
            
            markdown = self._scrape_url_with_firecrawl(url)
            
            if not markdown:
                print(f"    Failed to scrape page {page}")
                break
            
            # Parse markdown to extract phone links
            # Format in markdown: [![](image)**Phone Name**](https://www.gsmarena.com/phone_url.php)
            # Also matches: [**Phone Name**](url) without image
            phone_pattern = r'\[!\[\]\([^)]*\)\*\*([^*]+)\*\*\]\((https://www\.gsmarena\.com/[a-z0-9_-]+\.php)\)'
            matches = re.findall(phone_pattern, markdown)
            
            page_phones = 0
            for phone_name, full_url in matches:
                # Filter out non-phone links (navigation, brand pages, etc.)
                if '-phones-' in full_url or 'makers' in full_url or 'compare' in full_url:
                    continue
                if 'search.php' in full_url or 'news.php' in full_url:
                    continue
                
                # Avoid duplicates
                if any(p['url'] == full_url for p in phones):
                    continue
                
                phones.append({
                    'name': phone_name.strip(),
                    'url': full_url,
                    'image': '',  # Will be filled during detail scraping
                    'brand': brand['name'],
                    'brand_slug': brand['slug'],
                })
                page_phones += 1
            
            print(f"    Page {page}: {page_phones} phones found")
            
            # Check if we got phones on this page
            if page_phones == 0:
                break
            
            # Check if we likely have more pages (50 phones per page typically)
            if page_phones < 40:  # Less than 40 means probably last page
                break
            
            page += 1
        
        return phones
    
    def discover_all_phone_urls(self, resume: bool = True) -> Dict[str, List[Dict]]:
        """Discover all phone URLs organized by brand using Firecrawl
        
        Args:
            resume: If True, resume from saved progress. If False, start fresh.
        """
        # Load existing progress if resuming
        all_phones_by_brand = {}
        completed_brands = set()
        
        if resume and os.path.exists(self.urls_file):
            print(f"\n[RESUME MODE] Loading existing progress from {self.urls_file}...")
            with open(self.urls_file, 'r') as f:
                data = json.load(f)
                all_phones_by_brand = data.get('brands', {})
                completed_brands = set(all_phones_by_brand.keys())
                self.stats['phones_discovered'] = sum(len(phones) for phones in all_phones_by_brand.values())
                self.stats['brands_discovered'] = len(all_phones_by_brand)
                print(f"  Loaded {self.stats['phones_discovered']} phone URLs from {self.stats['brands_discovered']} brands")
                print(f"  Will skip these completed brands and continue from where we left off")
        
        brands = self.discover_all_brands()
        
        if not brands:
            print("ERROR: No brands discovered")
            return all_phones_by_brand
        
        # Count remaining brands
        remaining_brands = [b for b in brands if b['name'] not in completed_brands]
        
        if not remaining_brands:
            print(f"\nAll {len(brands)} brands already completed!")
            return all_phones_by_brand
        
        # Estimate credits needed for remaining URL discovery
        estimated_pages = sum((b['phone_count'] // 50) + 1 for b in remaining_brands)
        print(f"\n[RESUME] Discovering phone URLs for {len(remaining_brands)} remaining brands (skipping {len(completed_brands)} completed)...")
        print(f"Estimated credits for remaining discovery: ~{estimated_pages}")
        print(f"Current credits used: {self.stats['credits_used']}")
        
        brands_processed = len(completed_brands)
        for i, brand in enumerate(remaining_brands, 1):
            brands_processed += 1
            print(f"\n[{brands_processed}/{len(brands)}] {brand['name']} ({brand['phone_count']} phones)...")
            
            phones = self.discover_phones_for_brand(brand)
            all_phones_by_brand[brand['name']] = phones
            
            self.stats['phones_discovered'] += len(phones)
            self.stats['brands_discovered'] = len(all_phones_by_brand)
            print(f"  Total found: {len(phones)} phones (Running total: {self.stats['phones_discovered']}, Credits: {self.stats['credits_used']})")
            
            # Save progress after EVERY brand (more resilient to interruptions)
            self._save_urls(all_phones_by_brand)
            
            # Print progress report every 5 brands
            if i % 5 == 0:
                print(f"\n  === Progress: {brands_processed}/{len(brands)} brands, {self.stats['phones_discovered']} phones, {self.stats['credits_used']} credits ===\n")
        
        print(f"\n{'='*60}")
        print(f"URL DISCOVERY COMPLETE")
        print(f"{'='*60}")
        print(f"Total brands: {len(all_phones_by_brand)}")
        print(f"Total phones: {self.stats['phones_discovered']}")
        print(f"Credits used for discovery: {self.stats['credits_used']}")
        
        return all_phones_by_brand
    
    def _save_urls(self, phones_by_brand: Dict):
        """Save discovered URLs to JSON file"""
        data = {
            'timestamp': datetime.now().isoformat(),
            'total_brands': len(phones_by_brand),
            'total_phones': sum(len(phones) for phones in phones_by_brand.values()),
            'brands': phones_by_brand,
        }
        
        with open(self.urls_file, 'w') as f:
            json.dump(data, f, indent=2)
        
        print(f"  Saved URLs to {self.urls_file}")
    
    # ==========================================
    # PHASE 2: DETAIL PAGE SCRAPING
    # ==========================================
    
    def scrape_phone_with_firecrawl(self, url: str) -> Optional[Dict]:
        """Scrape a single phone's specs using Firecrawl"""
        if not self.firecrawl:
            print("ERROR: Firecrawl not configured")
            return None
        
        try:
            # Use correct Firecrawl method: scrape() not scrape_url()
            result = self.firecrawl.scrape(
                url,
                formats=['markdown'],
                timeout=120000,  # 120 seconds
                wait_for=30000,  # 30 seconds wait for page load
            )
            
            self.stats['credits_used'] += 1
            
            # Firecrawl returns a Document object with attributes, not a dictionary
            if result and hasattr(result, 'markdown') and result.markdown:
                return {
                    'url': url,
                    'markdown': result.markdown,
                    'metadata': result.metadata if hasattr(result, 'metadata') else {},
                    'scraped_at': datetime.now().isoformat(),
                }
            
            return None
            
        except Exception as e:
            print(f"  Firecrawl error: {e}")
            self.stats['errors'] += 1
            return None
    
    def parse_phone_specs(self, markdown: str) -> Dict:
        """Parse phone specs from markdown content"""
        specs = {}
        
        # Extract model name
        name_match = re.search(r'^#\s*(.+?)(?:\n|$)', markdown, re.MULTILINE)
        if name_match:
            specs['model_name'] = name_match.group(1).strip()
        
        # Common spec patterns
        spec_patterns = {
            'released': r'Released[:\s]+([^\n]+)',
            'body': r'Body[:\s]+([^\n]+)',
            'weight': r'Weight[:\s]+([^\n]+)',
            'display_size': r'Display[:\s]+(\d+\.?\d*["\s]*inch[^\n]*)',
            'display_type': r'Type[:\s]+(AMOLED|IPS|OLED|LCD|Super AMOLED[^\n]*)',
            'resolution': r'Resolution[:\s]+(\d+\s*x\s*\d+[^\n]*)',
            'os': r'OS[:\s]+([^\n]+)',
            'chipset': r'Chipset[:\s]+([^\n]+)',
            'cpu': r'CPU[:\s]+([^\n]+)',
            'gpu': r'GPU[:\s]+([^\n]+)',
            'memory': r'Internal[:\s]+([^\n]+)',
            'main_camera': r'Main Camera[:\s]+([^\n]+)',
            'selfie_camera': r'Selfie[:\s]+([^\n]+)',
            'battery': r'Battery[:\s]+([^\n]+)',
            'charging': r'Charging[:\s]+([^\n]+)',
            'price': r'Price[:\s]+([^\n]+)',
            'colors': r'Colors[:\s]+([^\n]+)',
            'network': r'Network[:\s]+([^\n]+)',
            'sim': r'SIM[:\s]+([^\n]+)',
            'dimensions': r'Dimensions[:\s]+([^\n]+)',
            'build': r'Build[:\s]+([^\n]+)',
            'protection': r'Protection[:\s]+([^\n]+)',
            'wlan': r'WLAN[:\s]+([^\n]+)',
            'bluetooth': r'Bluetooth[:\s]+([^\n]+)',
            'nfc': r'NFC[:\s]+([^\n]+)',
            'usb': r'USB[:\s]+([^\n]+)',
            'sensors': r'Sensors[:\s]+([^\n]+)',
        }
        
        for key, pattern in spec_patterns.items():
            match = re.search(pattern, markdown, re.IGNORECASE)
            if match:
                specs[key] = match.group(1).strip()
        
        return specs
    
    def save_phone_to_database(self, phone_data: Dict, specs: Dict) -> bool:
        """Save phone data to Supabase database"""
        if not self.supabase:
            return False
        
        try:
            brand_name = phone_data.get('brand', 'Unknown')
            
            # First, ensure brand exists
            brand_result = self.supabase.table('brands').select('id').eq('name', brand_name).execute()
            
            if brand_result.data:
                brand_id = brand_result.data[0]['id']
            else:
                # Create brand
                brand_slug = brand_name.lower().replace(' ', '-')
                brand_insert = self.supabase.table('brands').insert({
                    'name': brand_name,
                    'slug': brand_slug,
                }).execute()
                brand_id = brand_insert.data[0]['id']
            
            # Create phone slug
            model_name = specs.get('model_name', phone_data.get('name', 'Unknown'))
            phone_slug = re.sub(r'[^a-z0-9]+', '-', model_name.lower()).strip('-')
            
            # Extract price if available
            price_usd = None
            if 'price' in specs:
                price_match = re.search(r'\$\s*([\d,]+)', specs['price'])
                if price_match:
                    price_usd = float(price_match.group(1).replace(',', ''))
            
            # Insert phone
            phone_insert = self.supabase.table('phones').upsert({
                'brand_id': brand_id,
                'model': model_name,
                'slug': phone_slug,
                'image_url': phone_data.get('image', ''),
                'price_usd': price_usd,
                'market_status': 'available',
            }, on_conflict='brand_id,slug').execute()
            
            phone_id = phone_insert.data[0]['id']
            
            # Insert specs
            specs_data = {
                'phone_id': phone_id,
                'network': {'technology': specs.get('network', '')},
                'launch': {'released': specs.get('released', '')},
                'body': {
                    'dimensions': specs.get('dimensions', ''),
                    'weight': specs.get('weight', ''),
                    'build': specs.get('build', ''),
                    'sim': specs.get('sim', ''),
                },
                'display': {
                    'type': specs.get('display_type', ''),
                    'size': specs.get('display_size', ''),
                    'resolution': specs.get('resolution', ''),
                    'protection': specs.get('protection', ''),
                },
                'platform': {
                    'os': specs.get('os', ''),
                    'chipset': specs.get('chipset', ''),
                    'cpu': specs.get('cpu', ''),
                    'gpu': specs.get('gpu', ''),
                },
                'memory': {'internal': specs.get('memory', '')},
                'main_camera': {'specs': specs.get('main_camera', '')},
                'selfie_camera': {'specs': specs.get('selfie_camera', '')},
                'battery': {
                    'type': specs.get('battery', ''),
                    'charging': specs.get('charging', ''),
                },
                'connectivity': {
                    'wlan': specs.get('wlan', ''),
                    'bluetooth': specs.get('bluetooth', ''),
                    'nfc': specs.get('nfc', ''),
                    'usb': specs.get('usb', ''),
                },
                'sensors': {'list': specs.get('sensors', '')},
                'data_sources': [{'source': 'gsmarena', 'url': phone_data.get('url', '')}],
            }
            
            self.supabase.table('phone_specs').upsert(
                specs_data, 
                on_conflict='phone_id'
            ).execute()
            
            self.stats['phones_saved_to_db'] += 1
            return True
            
        except Exception as e:
            print(f"  Database error: {e}")
            self.stats['errors'] += 1
            return False
    
    def scrape_all_phones(self, phones_by_brand: Dict[str, List[Dict]]):
        """Scrape all phones brand by brand"""
        print("\n" + "="*60)
        print("PHASE 2: DETAIL PAGE SCRAPING")
        print("="*60)
        
        self.stats['start_time'] = datetime.now()
        
        # Load progress if exists
        progress = self._load_progress()
        
        total_phones = sum(len(phones) for phones in phones_by_brand.values())
        print(f"\nTotal phones to scrape: {total_phones}")
        print(f"Rate limit: {RATE_LIMIT_DELAY}s between requests")
        print(f"Estimated time: {(total_phones * RATE_LIMIT_DELAY) / 3600:.1f} hours")
        
        scraped_count = 0
        
        for brand_name, phones in phones_by_brand.items():
            # Skip if brand already completed
            if brand_name in progress.get('completed_brands', []):
                print(f"\n[SKIP] {brand_name} - already completed")
                scraped_count += len(phones)
                continue
            
            print(f"\n{'='*40}")
            print(f"BRAND: {brand_name} ({len(phones)} phones)")
            print(f"{'='*40}")
            
            brand_results = []
            
            for i, phone in enumerate(phones, 1):
                # Skip if phone already scraped
                if phone['url'] in progress.get('scraped_urls', []):
                    print(f"  [{i}/{len(phones)}] SKIP: {phone['name']}")
                    scraped_count += 1
                    continue
                
                print(f"  [{i}/{len(phones)}] Scraping: {phone['name']}...")
                
                # Scrape with Firecrawl
                result = self.scrape_phone_with_firecrawl(phone['url'])
                
                if result:
                    # Parse specs
                    specs = self.parse_phone_specs(result['markdown'])
                    
                    # Save to database
                    db_saved = self.save_phone_to_database(phone, specs)
                    
                    # Save to local JSON
                    brand_results.append({
                        'phone': phone,
                        'specs': specs,
                        'raw_markdown': result['markdown'][:1000] + '...',  # Truncate for storage
                        'db_saved': db_saved,
                    })
                    
                    self.stats['phones_scraped'] += 1
                    scraped_count += 1
                    
                    # Update progress
                    progress.setdefault('scraped_urls', []).append(phone['url'])
                    
                    print(f"    Specs extracted: {len(specs)} | DB: {'OK' if db_saved else 'FAIL'}")
                else:
                    print(f"    FAILED to scrape")
                
                # Progress report
                if scraped_count % PROGRESS_REPORT_INTERVAL == 0:
                    self._print_progress_report(scraped_count, total_phones)
                
                # Rate limiting
                if i < len(phones):
                    print(f"    Waiting {RATE_LIMIT_DELAY}s for rate limit...")
                    time.sleep(RATE_LIMIT_DELAY)
            
            # Save brand results to JSON
            self._save_brand_results(brand_name, brand_results)
            
            # Mark brand as completed
            progress.setdefault('completed_brands', []).append(brand_name)
            self._save_progress(progress)
            
            print(f"\n{brand_name} COMPLETE: {len(brand_results)} phones scraped")
        
        # Final report
        self._print_final_report()
    
    def _load_progress(self) -> Dict:
        """Load scraping progress from file"""
        if os.path.exists(self.progress_file):
            with open(self.progress_file, 'r') as f:
                return json.load(f)
        return {}
    
    def _save_progress(self, progress: Dict):
        """Save scraping progress to file"""
        progress['last_updated'] = datetime.now().isoformat()
        with open(self.progress_file, 'w') as f:
            json.dump(progress, f, indent=2)
    
    def _save_brand_results(self, brand_name: str, results: List[Dict]):
        """Save brand results to JSON file"""
        filename = f"scraped_{brand_name.lower().replace(' ', '_')}.json"
        with open(filename, 'w') as f:
            json.dump({
                'brand': brand_name,
                'timestamp': datetime.now().isoformat(),
                'count': len(results),
                'phones': results,
            }, f, indent=2)
        print(f"  Saved to {filename}")
    
    def _print_progress_report(self, scraped: int, total: int):
        """Print progress report"""
        elapsed = (datetime.now() - self.stats['start_time']).total_seconds()
        rate = scraped / elapsed if elapsed > 0 else 0
        remaining = (total - scraped) / rate if rate > 0 else 0
        
        print(f"\n{'='*60}")
        print(f"PROGRESS REPORT")
        print(f"{'='*60}")
        print(f"Phones scraped: {scraped}/{total} ({100*scraped/total:.1f}%)")
        print(f"Credits used: {self.stats['credits_used']}")
        print(f"Errors: {self.stats['errors']}")
        print(f"Elapsed time: {elapsed/3600:.1f} hours")
        print(f"Estimated remaining: {remaining/3600:.1f} hours")
        print(f"{'='*60}\n")
    
    def _print_final_report(self):
        """Print final scraping report"""
        elapsed = (datetime.now() - self.stats['start_time']).total_seconds()
        
        print(f"\n{'='*60}")
        print(f"SCRAPING COMPLETE")
        print(f"{'='*60}")
        print(f"Total phones scraped: {self.stats['phones_scraped']}")
        print(f"Phones saved to DB: {self.stats['phones_saved_to_db']}")
        print(f"Credits used: {self.stats['credits_used']}")
        print(f"Errors: {self.stats['errors']}")
        print(f"Total time: {elapsed/3600:.1f} hours")
        print(f"{'='*60}")
    
    def run(self):
        """Run the full scraping process"""
        print("\n" + "="*60)
        print("GSMArena Full Scraper")
        print("="*60)
        print(f"Started at: {datetime.now().isoformat()}")
        
        # Phase 1: URL Discovery
        phones_by_brand = self.discover_all_phone_urls()
        
        # Phase 2: Detail Page Scraping
        self.scrape_all_phones(phones_by_brand)


if __name__ == '__main__':
    scraper = GSMArenaFullScraper()
    scraper.run()
