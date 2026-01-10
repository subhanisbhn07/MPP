# MobilePhonesPro (MPP) - PSEO Implementation Roadmap

## Based on Koray Tugberk Gubur's Semantic SEO Framework

---

## Executive Summary

This roadmap transforms MPP into a programmatic SEO powerhouse following Koray Tugberk Gubur's first principles. The implementation will generate **72+ million unique, SEO-optimized pages** from a comprehensive database of **12,000+ phones across 117 brands**.

**Key Differentiators:**
- **4-Phone Side-by-Side Comparison** (unique in market - competitors only offer 2-3)
- **Spec-Based Scoring System** (transparent, algorithmic ratings out of 100 - no AI)
- **Modern, Clean UI** (vs GSMArena's dated design)
- **Price Tracking Integration** (like Kimovil)
- **Visual Size Comparison** (like PhoneArena)
- **Comprehensive Database** (12,000+ phones, 117 brands)

---

## Part 0: Competitive Analysis & Market Positioning

### 0.1 Competitive Landscape

| Competitor | Database | Compare Limit | Unique Strength | Weakness |
|------------|----------|---------------|-----------------|----------|
| **GSMArena** | 13,000+ phones | 3 phones | Market leader, detailed specs, camera samples | Dated UI, cluttered design |
| **PhoneArena** | 5,000+ phones | 3 phones | Visual size comparison, detailed benchmarks | Limited database |
| **Versus** | 3,000+ phones | Unlimited | Scoring system, multi-category | Less detailed specs |
| **Kimovil** | 4,000+ phones | 2 phones | Price comparison across 100+ stores | Limited to 2-phone comparison |
| **NanoReview** | 850+ phones | 2 phones | Deep analytical scores | Small database |
| **91mobiles** | 5,000+ phones | 3 phones | Indian market focus, spec-based scoring | Regional focus |

### 0.2 MPP Competitive Advantages

**1. 4-Phone Side-by-Side Comparison (UNIQUE)**
- No major competitor offers 4-phone comparison
- Enables complex decision-making (e.g., "iPhone 16 vs Galaxy S25 vs Pixel 9 vs OnePlus 13")
- Creates unique long-tail SEO opportunities

**2. Spec-Based Scoring System (No AI)**
- Transparent, algorithmic scoring out of 100
- Users can understand exactly why a phone scores what it does
- No black-box AI recommendations - builds trust

**3. Modern, Clean UI**
- GSMArena's design is from 2010s
- Modern card-based layouts, dark mode, responsive design
- Better mobile experience

**4. Comprehensive Database**
- 12,000+ phones across 117 brands
- Historical data for topical authority
- New devices added within 24 hours of announcement

**5. Price Tracking Integration**
- Real-time price comparison across retailers
- Price history charts
- Price drop alerts

**6. Visual Size Comparison**
- Overlay phones to compare physical dimensions
- Real-world size context (vs credit card, hand)

### 0.3 Page Scale Potential

| Page Type | Formula | Count |
|-----------|---------|-------|
| Phone Spec Pages | 12,000 phones | 12,000 |
| 2-Phone Comparisons | C(12000,2) | 71,994,000 |
| 3-Phone Comparisons | C(12000,3) | 287,960,004,000 (focus on popular ~100K) |
| 4-Phone Comparisons | C(12000,4) | Focus on popular ~50K |
| Category Rankings | 50 categories | 50 |
| Price Range Pages | 20 ranges | 20 |
| Brand Pages | 117 brands | 117 |
| Brand vs Brand | C(117,2) | 6,786 |

**Realistic Target**: Focus on popular phones (top 500) for multi-phone comparisons = ~500K+ unique pages

---

## Part 0.5: Spec-Based Scoring System (Non-AI)

### Why Scoring Instead of AI Recommendations

The user explicitly requested **NO AI recommendations** for frontend users. Instead, MPP will use a transparent, spec-based scoring system similar to 91mobiles. This approach:

1. **Builds Trust**: Users can see exactly how scores are calculated
2. **Is Reproducible**: Same specs = same score, always
3. **Requires No ML Infrastructure**: Pure algorithmic calculation
4. **Improves UX**: Quick at-a-glance comparison without reading full specs

### Scoring Methodology (100 Points Total)

Based on analysis of 91mobiles' scoring system, here's the proposed MPP scoring algorithm:

#### Category Breakdown

| Category | Weight | Max Points |
|----------|--------|------------|
| Performance | 25% | 25 |
| Display | 20% | 20 |
| Camera | 25% | 25 |
| Battery | 15% | 15 |
| Build & Features | 15% | 15 |
| **Total** | **100%** | **100** |

#### Performance Score (25 Points)

| Spec | Points | Calculation |
|------|--------|-------------|
| Processor Tier | 0-15 | Based on chipset ranking (Snapdragon 8 Gen 3 = 15, Snapdragon 7s Gen 2 = 10, etc.) |
| RAM | 0-5 | 4GB=1, 6GB=2, 8GB=3, 12GB=4, 16GB+=5 |
| Storage Type | 0-5 | eMMC=1, UFS 2.1=2, UFS 3.0=3, UFS 3.1=4, UFS 4.0=5 |

#### Display Score (20 Points)

| Spec | Points | Calculation |
|------|--------|-------------|
| Resolution | 0-6 | HD=2, FHD=4, QHD+=6 |
| Refresh Rate | 0-5 | 60Hz=1, 90Hz=3, 120Hz=4, 144Hz+=5 |
| Panel Type | 0-5 | LCD=2, AMOLED=4, LTPO AMOLED=5 |
| Brightness | 0-4 | <500nits=1, 500-1000=2, 1000-2000=3, 2000+=4 |

#### Camera Score (25 Points)

| Spec | Points | Calculation |
|------|--------|-------------|
| Main Sensor | 0-10 | Based on MP + sensor size + OIS presence |
| Versatility | 0-8 | Ultrawide=2, Telephoto=3, Macro=1, Periscope=2 |
| Video Capability | 0-4 | 1080p=1, 4K30=2, 4K60=3, 8K=4 |
| Front Camera | 0-3 | <12MP=1, 12-32MP=2, 32MP+=3 |

#### Battery Score (15 Points)

| Spec | Points | Calculation |
|------|--------|-------------|
| Capacity | 0-6 | 3000mAh=2, 4000mAh=3, 4500mAh=4, 5000mAh=5, 5500mAh+=6 |
| Charging Speed | 0-5 | 18W=1, 33W=2, 67W=3, 100W=4, 120W+=5 |
| Wireless Charging | 0-2 | Yes=2, No=0 |
| Reverse Charging | 0-2 | Yes=2, No=0 |

#### Build & Features Score (15 Points)

| Spec | Points | Calculation |
|------|--------|-------------|
| IP Rating | 0-4 | None=0, IP54=1, IP67=3, IP68=4 |
| 5G Support | 0-3 | Yes=3, No=0 |
| NFC | 0-2 | Yes=2, No=0 |
| Build Materials | 0-3 | Plastic=1, Glass=2, Titanium/Ceramic=3 |
| Biometrics | 0-3 | Basic fingerprint=1, Face unlock=1, Ultrasonic=2 |

### Category Labels

| Score Range | Label | Color |
|-------------|-------|-------|
| 90-100 | Best In Class | Green |
| 75-89 | Excellent | Blue |
| 60-74 | Good | Yellow |
| 40-59 | Average | Orange |
| Below 40 | Below Average | Red |

### Implementation

```typescript
// src/lib/scoring.ts
interface PhoneScore {
  total: number;
  performance: number;
  display: number;
  camera: number;
  battery: number;
  buildFeatures: number;
  labels: {
    performance: string;
    display: string;
    camera: string;
    battery: string;
    buildFeatures: string;
  };
}

export function calculatePhoneScore(specs: PhoneSpecs): PhoneScore {
  const performance = calculatePerformanceScore(specs);
  const display = calculateDisplayScore(specs);
  const camera = calculateCameraScore(specs);
  const battery = calculateBatteryScore(specs);
  const buildFeatures = calculateBuildScore(specs);
  
  const total = performance + display + camera + battery + buildFeatures;
  
  return {
    total,
    performance,
    display,
    camera,
    battery,
    buildFeatures,
    labels: {
      performance: getLabel(performance, 25),
      display: getLabel(display, 20),
      camera: getLabel(camera, 25),
      battery: getLabel(battery, 15),
      buildFeatures: getLabel(buildFeatures, 15),
    },
  };
}

function getLabel(score: number, maxScore: number): string {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 90) return 'Best In Class';
  if (percentage >= 75) return 'Excellent';
  if (percentage >= 60) return 'Good';
  if (percentage >= 40) return 'Average';
  return 'Below Average';
}
```

### How Scoring Improves UX Without AI

1. **Quick Decision Making**: Users see "96%" and immediately know it's a top-tier phone
2. **Category Comparison**: "Best In Class" display vs "Good" camera helps prioritize
3. **Objective Comparison**: In 4-phone comparison, scores highlight clear winners
4. **Filter & Sort**: Users can filter phones by minimum score threshold
5. **Trust Building**: Transparent methodology means users trust the scores

---

## Part 0.6: 4-Phone Comparison Feature

### Why 4-Phone Comparison?

Most users compare 3-4 phones before purchasing. Current competitors only support 2-3 phones, forcing users to make multiple comparisons. MPP's 4-phone comparison is a unique differentiator.

### URL Structure

```
/compare/[phone1]-vs-[phone2]-vs-[phone3]-vs-[phone4]
```

Example: `/compare/iphone-16-pro-vs-samsung-galaxy-s25-ultra-vs-google-pixel-9-pro-vs-oneplus-13`

### SEO Opportunity

With 500 popular phones, 4-phone combinations = C(500,4) = 2.6 billion possible pages. Focus on:
- Top 100 phones: C(100,4) = 3.9 million combinations
- Realistic target: Generate top 50,000 most-searched combinations

### Implementation

```typescript
// src/app/compare/[...slugs]/page.tsx
export async function generateStaticParams() {
  const popularPhones = await getPopularPhones(100);
  const params: { slugs: string[] }[] = [];
  
  // Generate 2-phone comparisons (all combinations)
  for (let i = 0; i < popularPhones.length; i++) {
    for (let j = i + 1; j < popularPhones.length; j++) {
      params.push({ slugs: [popularPhones[i].slug, 'vs', popularPhones[j].slug] });
    }
  }
  
  // Generate 3-phone comparisons (top combinations based on search volume)
  // Generate 4-phone comparisons (top combinations based on search volume)
  
  return params;
}
```

### Comparison Table Design

```
┌─────────────────┬──────────────┬──────────────┬──────────────┬──────────────┐
│ Spec            │ iPhone 16    │ Galaxy S25   │ Pixel 9 Pro  │ OnePlus 13   │
├─────────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
│ OVERALL SCORE   │ 94/100       │ 96/100 ★     │ 92/100       │ 91/100       │
├─────────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
│ Performance     │ Excellent    │ Best In Class│ Excellent    │ Excellent    │
│ Display         │ Best In Class│ Best In Class│ Excellent    │ Excellent    │
│ Camera          │ Best In Class│ Best In Class│ Best In Class│ Excellent    │
│ Battery         │ Good         │ Excellent    │ Good         │ Excellent    │
│ Build           │ Excellent    │ Excellent    │ Excellent    │ Good         │
└─────────────────┴──────────────┴──────────────┴──────────────┴──────────────┘
```

---

## Part 0.7: Data Acquisition Strategy

### Data Sources

| Source | Data Type | Method | Notes |
|--------|-----------|--------|-------|
| GSMArena | Phone specs | Web scraping | Primary source, 13,000+ phones |
| Official brand sites | Launch info, images | Manual + scraping | For new releases |
| Benchmark databases | AnTuTu, Geekbench scores | API/scraping | For performance scoring |
| Price aggregators | Pricing data | API integration | Amazon, Best Buy, etc. |

### Firecrawl.dev Evaluation

**What is Firecrawl?**
Firecrawl is a web scraping API that converts websites to LLM-ready markdown. It handles JavaScript rendering, anti-bot protection, and structured data extraction.

**Pricing:**
| Plan | Credits/Month | Cost | Use Case |
|------|---------------|------|----------|
| Free | 500 (one-time) | $0 | Initial testing |
| Hobby | 3,000 | $16/month | Small-scale updates |
| Standard | 100,000 | $83/month | Full database maintenance |

**Recommendation:**
- **For initial data load**: Use existing databases (Teoalida, GSMArena exports)
- **For ongoing updates**: Firecrawl Standard ($83/month) for 100K pages/month
- **For custom scraping**: Selenium + ChromeDriver (headless) for specific needs

### Data Update Strategy

1. **New Phone Releases**: Scrape within 24 hours of announcement
2. **Price Updates**: Daily scraping of price aggregators
3. **Spec Corrections**: Weekly validation against official sources
4. **Benchmark Updates**: Monthly refresh of performance scores

---

## Part 0.8: Geo-Based Pricing Architecture

### Business Model Overview

MPP is a **free global platform** with two revenue streams:
1. **Affiliate Commissions**: Earn when users click "Buy Now" and purchase from retailers
2. **Ad Revenue**: Google AdSense and premium ad networks

### Target Markets (Tier 1 Countries)

| Country | Code | Currency | Primary Retailers | Secondary Retailers |
|---------|------|----------|-------------------|---------------------|
| India | IN | INR (₹) | Amazon.in, Flipkart | Croma, Reliance Digital, Vijay Sales |
| USA | US | USD ($) | Amazon.com, Best Buy | Walmart, Target, B&H Photo |
| UK | GB | GBP (£) | Amazon.co.uk, Currys | Argos, John Lewis, Carphone Warehouse |
| Canada | CA | CAD ($) | Amazon.ca, Best Buy Canada | Walmart Canada, The Source |
| Australia | AU | AUD ($) | Amazon.com.au, JB Hi-Fi | Harvey Norman, Officeworks |
| Germany | DE | EUR (€) | Amazon.de, MediaMarkt | Saturn, Otto, Cyberport |
| UAE | AE | AED | Amazon.ae, Noon | Sharaf DG, Jumbo Electronics |

### Geo-Detection System

```typescript
// src/lib/geo.ts
import { headers } from 'next/headers';

export interface GeoInfo {
  countryCode: string;
  countryName: string;
  currency: string;
  currencySymbol: string;
}

const COUNTRY_CONFIG: Record<string, GeoInfo> = {
  IN: { countryCode: 'IN', countryName: 'India', currency: 'INR', currencySymbol: '₹' },
  US: { countryCode: 'US', countryName: 'United States', currency: 'USD', currencySymbol: '$' },
  GB: { countryCode: 'GB', countryName: 'United Kingdom', currency: 'GBP', currencySymbol: '£' },
  CA: { countryCode: 'CA', countryName: 'Canada', currency: 'CAD', currencySymbol: 'CA$' },
  AU: { countryCode: 'AU', countryName: 'Australia', currency: 'AUD', currencySymbol: 'A$' },
  DE: { countryCode: 'DE', countryName: 'Germany', currency: 'EUR', currencySymbol: '€' },
  AE: { countryCode: 'AE', countryName: 'UAE', currency: 'AED', currencySymbol: 'AED' },
};

export async function getGeoInfo(): Promise<GeoInfo> {
  const headersList = headers();
  
  // Vercel provides geo info in headers
  const country = headersList.get('x-vercel-ip-country') || 'US';
  
  return COUNTRY_CONFIG[country] || COUNTRY_CONFIG['US'];
}

// Client-side fallback using browser timezone
export function getCountryFromTimezone(): string {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timezoneToCountry: Record<string, string> = {
    'Asia/Kolkata': 'IN',
    'America/New_York': 'US',
    'America/Los_Angeles': 'US',
    'Europe/London': 'GB',
    'America/Toronto': 'CA',
    'Australia/Sydney': 'AU',
    'Europe/Berlin': 'DE',
    'Asia/Dubai': 'AE',
  };
  return timezoneToCountry[timezone] || 'US';
}
```

### Database Schema for Pricing

```sql
-- Countries and currencies
CREATE TABLE countries (
  code VARCHAR(2) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  currency_code VARCHAR(3) NOT NULL,
  currency_symbol VARCHAR(5) NOT NULL,
  is_active BOOLEAN DEFAULT true
);

-- Insert Tier 1 countries
INSERT INTO countries (code, name, currency_code, currency_symbol) VALUES
  ('IN', 'India', 'INR', '₹'),
  ('US', 'United States', 'USD', '$'),
  ('GB', 'United Kingdom', 'GBP', '£'),
  ('CA', 'Canada', 'CAD', 'CA$'),
  ('AU', 'Australia', 'AUD', 'A$'),
  ('DE', 'Germany', 'EUR', '€'),
  ('AE', 'UAE', 'AED', 'AED');

-- Retailers per country
CREATE TABLE retailers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  country_code VARCHAR(2) REFERENCES countries(code),
  logo_url TEXT,
  base_url TEXT NOT NULL,
  affiliate_program VARCHAR(100),
  affiliate_network VARCHAR(100), -- 'amazon', 'cj', 'impact', etc.
  is_active BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 1, -- Display order
  UNIQUE(slug, country_code)
);

-- Insert retailers
INSERT INTO retailers (name, slug, country_code, base_url, affiliate_program, affiliate_network, priority) VALUES
  -- India
  ('Amazon India', 'amazon-in', 'IN', 'https://www.amazon.in', 'Amazon Associates India', 'amazon', 1),
  ('Flipkart', 'flipkart', 'IN', 'https://www.flipkart.com', 'Flipkart Affiliate', 'flipkart', 2),
  ('Croma', 'croma', 'IN', 'https://www.croma.com', 'Croma Affiliate', 'impact', 3),
  -- USA
  ('Amazon US', 'amazon-us', 'US', 'https://www.amazon.com', 'Amazon Associates', 'amazon', 1),
  ('Best Buy', 'bestbuy', 'US', 'https://www.bestbuy.com', 'Best Buy Affiliate', 'impact', 2),
  ('Walmart', 'walmart', 'US', 'https://www.walmart.com', 'Walmart Affiliate', 'impact', 3),
  -- UK
  ('Amazon UK', 'amazon-uk', 'GB', 'https://www.amazon.co.uk', 'Amazon Associates UK', 'amazon', 1),
  ('Currys', 'currys', 'GB', 'https://www.currys.co.uk', 'Currys Affiliate', 'awin', 2),
  ('Argos', 'argos', 'GB', 'https://www.argos.co.uk', 'Argos Affiliate', 'awin', 3),
  -- Canada
  ('Amazon Canada', 'amazon-ca', 'CA', 'https://www.amazon.ca', 'Amazon Associates Canada', 'amazon', 1),
  ('Best Buy Canada', 'bestbuy-ca', 'CA', 'https://www.bestbuy.ca', 'Best Buy Canada Affiliate', 'cj', 2),
  -- Australia
  ('Amazon Australia', 'amazon-au', 'AU', 'https://www.amazon.com.au', 'Amazon Associates AU', 'amazon', 1),
  ('JB Hi-Fi', 'jbhifi', 'AU', 'https://www.jbhifi.com.au', 'JB Hi-Fi Affiliate', 'commission-factory', 2),
  -- Germany
  ('Amazon Germany', 'amazon-de', 'DE', 'https://www.amazon.de', 'Amazon Associates DE', 'amazon', 1),
  ('MediaMarkt', 'mediamarkt', 'DE', 'https://www.mediamarkt.de', 'MediaMarkt Affiliate', 'awin', 2),
  -- UAE
  ('Amazon UAE', 'amazon-ae', 'AE', 'https://www.amazon.ae', 'Amazon Associates UAE', 'amazon', 1),
  ('Noon', 'noon', 'AE', 'https://www.noon.com', 'Noon Affiliate', 'noon', 2);

-- Phone prices per retailer
CREATE TABLE phone_prices (
  id SERIAL PRIMARY KEY,
  phone_id INTEGER REFERENCES phones(id),
  retailer_id INTEGER REFERENCES retailers(id),
  price DECIMAL(12,2) NOT NULL,
  original_price DECIMAL(12,2), -- For showing discounts
  product_url TEXT NOT NULL, -- Direct product URL (without affiliate tag)
  product_id VARCHAR(100), -- ASIN for Amazon, SKU for others
  in_stock BOOLEAN DEFAULT true,
  last_updated TIMESTAMP DEFAULT NOW(),
  UNIQUE(phone_id, retailer_id)
);

-- Price history for charts
CREATE TABLE price_history (
  id SERIAL PRIMARY KEY,
  phone_id INTEGER REFERENCES phones(id),
  retailer_id INTEGER REFERENCES retailers(id),
  price DECIMAL(12,2) NOT NULL,
  recorded_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_phone_prices_phone ON phone_prices(phone_id);
CREATE INDEX idx_phone_prices_retailer ON phone_prices(retailer_id);
CREATE INDEX idx_price_history_phone ON price_history(phone_id);
CREATE INDEX idx_price_history_date ON price_history(recorded_at);
```

### Price Display Component

```typescript
// src/components/price-display.tsx
'use client';

import { useEffect, useState } from 'react';
import { getCountryFromTimezone } from '@/lib/geo';

interface PriceInfo {
  retailer: string;
  price: number;
  originalPrice?: number;
  currency: string;
  currencySymbol: string;
  affiliateUrl: string;
  inStock: boolean;
}

interface PriceDisplayProps {
  phoneId: number;
  serverCountry?: string;
}

export function PriceDisplay({ phoneId, serverCountry }: PriceDisplayProps) {
  const [prices, setPrices] = useState<PriceInfo[]>([]);
  const [country, setCountry] = useState(serverCountry || 'US');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use client-side detection as fallback
    if (!serverCountry) {
      setCountry(getCountryFromTimezone());
    }
  }, [serverCountry]);

  useEffect(() => {
    async function fetchPrices() {
      setLoading(true);
      const res = await fetch(`/api/prices/${phoneId}?country=${country}`);
      const data = await res.json();
      setPrices(data.prices);
      setLoading(false);
    }
    fetchPrices();
  }, [phoneId, country]);

  if (loading) return <PriceSkeleton />;

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Buy from:</h3>
      {prices.map((price) => (
        <a
          key={price.retailer}
          href={price.affiliateUrl}
          target="_blank"
          rel="noopener sponsored"
          className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/10 transition"
        >
          <span className="font-medium">{price.retailer}</span>
          <div className="text-right">
            {price.originalPrice && price.originalPrice > price.price && (
              <span className="text-sm text-muted-foreground line-through mr-2">
                {price.currencySymbol}{price.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="font-bold text-lg">
              {price.currencySymbol}{price.price.toLocaleString()}
            </span>
            {!price.inStock && (
              <span className="ml-2 text-xs text-red-500">Out of Stock</span>
            )}
          </div>
        </a>
      ))}
      <p className="text-xs text-muted-foreground">
        * Prices may vary. Click to see current price.
      </p>
    </div>
  );
}
```

---

## Part 0.9: Affiliate Integration Strategy

### Affiliate Programs to Join

| Program | Countries | Commission | Cookie Duration | Requirements |
|---------|-----------|------------|-----------------|--------------|
| Amazon Associates | All 7 | 1-4% | 24 hours | Website with content |
| Flipkart Affiliate | India | 2-5% | 30 days | Indian bank account |
| Best Buy Affiliate | US, CA | 0.5-1% | 1 day | Impact Radius account |
| Currys/Argos (Awin) | UK | 1-3% | 30 days | Awin account |
| JB Hi-Fi | Australia | 1-2% | 30 days | Commission Factory |
| MediaMarkt (Awin) | Germany | 1-2% | 30 days | Awin account |
| Noon | UAE | 2-4% | 7 days | Direct application |

### Affiliate Link Generation

```typescript
// src/lib/affiliate.ts

interface AffiliateConfig {
  amazon: {
    IN: string; // mpp-21
    US: string; // mpp0a-20
    GB: string; // mpp-21
    CA: string; // mpp0a-20
    AU: string; // mpp-22
    DE: string; // mpp0a-21
    AE: string; // mpp-21
  };
  flipkart: string;
  impact: string; // For Best Buy, Walmart
  awin: string; // For Currys, Argos, MediaMarkt
  commissionFactory: string; // For JB Hi-Fi
  noon: string;
}

// Store affiliate IDs securely in environment variables
const AFFILIATE_IDS: AffiliateConfig = {
  amazon: {
    IN: process.env.AMAZON_AFFILIATE_IN || '',
    US: process.env.AMAZON_AFFILIATE_US || '',
    GB: process.env.AMAZON_AFFILIATE_GB || '',
    CA: process.env.AMAZON_AFFILIATE_CA || '',
    AU: process.env.AMAZON_AFFILIATE_AU || '',
    DE: process.env.AMAZON_AFFILIATE_DE || '',
    AE: process.env.AMAZON_AFFILIATE_AE || '',
  },
  flipkart: process.env.FLIPKART_AFFILIATE || '',
  impact: process.env.IMPACT_AFFILIATE || '',
  awin: process.env.AWIN_AFFILIATE || '',
  commissionFactory: process.env.CF_AFFILIATE || '',
  noon: process.env.NOON_AFFILIATE || '',
};

export function generateAffiliateUrl(
  productUrl: string,
  retailerSlug: string,
  countryCode: string
): string {
  // Amazon - different tag per country
  if (retailerSlug.startsWith('amazon')) {
    const tag = AFFILIATE_IDS.amazon[countryCode as keyof typeof AFFILIATE_IDS.amazon];
    if (!tag) return productUrl;
    
    const url = new URL(productUrl);
    url.searchParams.set('tag', tag);
    return url.toString();
  }

  // Flipkart
  if (retailerSlug === 'flipkart') {
    const url = new URL(productUrl);
    url.searchParams.set('affid', AFFILIATE_IDS.flipkart);
    return url.toString();
  }

  // Impact Radius (Best Buy, Walmart)
  if (['bestbuy', 'bestbuy-ca', 'walmart'].includes(retailerSlug)) {
    return `https://goto.target.com/c/${AFFILIATE_IDS.impact}/url?u=${encodeURIComponent(productUrl)}`;
  }

  // Awin (Currys, Argos, MediaMarkt)
  if (['currys', 'argos', 'mediamarkt'].includes(retailerSlug)) {
    return `https://www.awin1.com/cread.php?awinmid=MERCHANT_ID&awinaffid=${AFFILIATE_IDS.awin}&ued=${encodeURIComponent(productUrl)}`;
  }

  // Commission Factory (JB Hi-Fi)
  if (retailerSlug === 'jbhifi') {
    return `https://t.cfjump.com/${AFFILIATE_IDS.commissionFactory}/t/MERCHANT_ID?url=${encodeURIComponent(productUrl)}`;
  }

  // Noon
  if (retailerSlug === 'noon') {
    const url = new URL(productUrl);
    url.searchParams.set('utm_source', 'affiliate');
    url.searchParams.set('utm_medium', AFFILIATE_IDS.noon);
    return url.toString();
  }

  return productUrl;
}
```

### API Endpoint for Prices

```typescript
// src/app/api/prices/[phoneId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { generateAffiliateUrl } from '@/lib/affiliate';

export async function GET(
  request: NextRequest,
  { params }: { params: { phoneId: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const country = searchParams.get('country') || 'US';
  
  const supabase = createClient();
  
  const { data: prices, error } = await supabase
    .from('phone_prices')
    .select(`
      price,
      original_price,
      product_url,
      in_stock,
      retailers (
        name,
        slug,
        country_code
      )
    `)
    .eq('phone_id', params.phoneId)
    .eq('retailers.country_code', country)
    .order('retailers.priority', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: countryInfo } = await supabase
    .from('countries')
    .select('currency_code, currency_symbol')
    .eq('code', country)
    .single();

  const formattedPrices = prices.map((p) => ({
    retailer: p.retailers.name,
    price: p.price,
    originalPrice: p.original_price,
    currency: countryInfo?.currency_code || 'USD',
    currencySymbol: countryInfo?.currency_symbol || '$',
    affiliateUrl: generateAffiliateUrl(p.product_url, p.retailers.slug, country),
    inStock: p.in_stock,
  }));

  return NextResponse.json({ prices: formattedPrices });
}
```

### FTC Disclosure Requirements

```typescript
// src/components/affiliate-disclosure.tsx
export function AffiliateDisclosure() {
  return (
    <p className="text-xs text-muted-foreground mt-4 p-3 bg-muted/50 rounded">
      <strong>Affiliate Disclosure:</strong> MobilePhonesPro may earn a commission 
      when you click on retailer links and make a purchase. This helps support our 
      free comparison service. Prices shown are for reference only and may vary.
    </p>
  );
}
```

---

## Part 0.10: Ad Revenue Integration

### Ad Strategy

**Phase 1 (0-50K monthly visitors)**: Google AdSense
- Easy approval process
- RPM: $1-3 for tech content
- Estimated revenue: $50-150/month at 50K visitors

**Phase 2 (50K-100K monthly visitors)**: Ezoic
- AI-optimized ad placements
- RPM: $5-10 for tech content
- Estimated revenue: $250-1000/month

**Phase 3 (100K+ monthly visitors)**: Mediavine or AdThrive
- Premium ad networks
- RPM: $15-30 for tech content
- Estimated revenue: $1500-3000+/month

### Ad Placement Strategy

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER (Sticky)                                              │
├─────────────────────────────────────────────────────────────┤
│ [LEADERBOARD AD - 728x90]                                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  PHONE SPECS / COMPARISON CONTENT                           │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ [IN-CONTENT AD - 300x250] (after specs table)               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  MORE CONTENT (Related phones, internal links)              │
│                                                              │
│  ┌──────────────┐                                           │
│  │ SIDEBAR AD   │  (Desktop only - sticky)                  │
│  │ 300x600      │                                           │
│  └──────────────┘                                           │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ [FOOTER AD - 728x90]                                        │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                       │
└─────────────────────────────────────────────────────────────┘
```

### AdSense Implementation

```typescript
// src/components/ads/adsense-unit.tsx
'use client';

import { useEffect } from 'react';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
}

export function AdSenseUnit({ slot, format = 'auto', className }: AdUnitProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

// Usage in layout
// <AdSenseUnit slot="1234567890" format="horizontal" className="my-4" />
```

### Revenue Projections

| Traffic | AdSense RPM | Affiliate Conv. | Monthly Revenue |
|---------|-------------|-----------------|-----------------|
| 10K | $2 | 0.5% | $20 + $50 = $70 |
| 50K | $3 | 0.8% | $150 + $400 = $550 |
| 100K | $8 (Ezoic) | 1% | $800 + $1000 = $1800 |
| 500K | $20 (Mediavine) | 1.5% | $10000 + $7500 = $17500 |

*Assumptions: Average order value $500, affiliate commission 2%*

---

## Part 0.11: Multi-Currency Support

### Currency Conversion

```typescript
// src/lib/currency.ts

interface ExchangeRates {
  [key: string]: number;
}

// Cache exchange rates (update daily)
let cachedRates: ExchangeRates | null = null;
let lastFetch: number = 0;

export async function getExchangeRates(): Promise<ExchangeRates> {
  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;
  
  if (cachedRates && now - lastFetch < ONE_DAY) {
    return cachedRates;
  }

  // Use free exchange rate API
  const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
  const data = await res.json();
  
  cachedRates = data.rates;
  lastFetch = now;
  
  return cachedRates;
}

export async function convertPrice(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<number> {
  if (fromCurrency === toCurrency) return amount;
  
  const rates = await getExchangeRates();
  
  // Convert to USD first, then to target currency
  const usdAmount = amount / rates[fromCurrency];
  const targetAmount = usdAmount * rates[toCurrency];
  
  return Math.round(targetAmount * 100) / 100;
}

export function formatPrice(
  amount: number,
  currency: string,
  locale?: string
): string {
  const localeMap: Record<string, string> = {
    INR: 'en-IN',
    USD: 'en-US',
    GBP: 'en-GB',
    CAD: 'en-CA',
    AUD: 'en-AU',
    EUR: 'de-DE',
    AED: 'ar-AE',
  };

  return new Intl.NumberFormat(locale || localeMap[currency] || 'en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
```

### Price Scraping Strategy

```typescript
// src/scripts/scrape-prices.ts
// Run as cron job every 6-24 hours

import { createClient } from '@supabase/supabase-js';

interface ScrapingConfig {
  retailer: string;
  method: 'api' | 'scrape';
  rateLimit: number; // requests per minute
}

const SCRAPING_CONFIG: ScrapingConfig[] = [
  // Amazon - Use Product Advertising API (PA-API)
  { retailer: 'amazon', method: 'api', rateLimit: 1 },
  // Flipkart - Use Affiliate API
  { retailer: 'flipkart', method: 'api', rateLimit: 10 },
  // Others - Scrape with Firecrawl or Selenium (headless)
  { retailer: 'bestbuy', method: 'scrape', rateLimit: 5 },
  { retailer: 'currys', method: 'scrape', rateLimit: 5 },
  { retailer: 'jbhifi', method: 'scrape', rateLimit: 5 },
];

// Note: Use headless Selenium + ChromeDriver for scraping
// Firecrawl Standard ($83/month) for 100K pages/month
```

---

## Part 1: Strategic Foundation

### 1.1 Source Context (Why MPP Exists in SERPs)

**Definition**: "The authoritative source for mobile phone specifications, comparisons, and buying decisions"

This source context should be reflected in:
- Site tagline and meta descriptions
- About page content
- Schema markup (Organization)
- Content tone and depth

### 1.2 Central Entity

**Central Entity**: "Mobile Phones"

Every page on the site reinforces this central entity through:
- Consistent terminology
- Internal linking patterns
- Site-wide N-grams (lexical patterns)

### 1.3 Central Search Intent

**Intent**: "Help users make informed mobile phone purchasing decisions through comprehensive specifications and comparisons"

This intent drives all content decisions and page templates.

---

## Part 2: Topical Map Architecture

### 2.1 Core Section (Monetization Hub)

The Core Section is where PageRank concentrates and monetization happens.

| Page Type | URL Pattern | Scale | Priority |
|-----------|-------------|-------|----------|
| Phone Specifications | `/phones/[brand]/[model]` | 100+ | P0 |
| 1v1 Comparisons | `/compare/[phone1]-vs-[phone2]` | 4,950+ | P0 |
| Category Rankings | `/best/[category]` | 50+ | P1 |
| Price Range Pages | `/best/phones-under-[price]` | 20+ | P1 |
| Brand vs Brand | `/compare/brands/[brand1]-vs-[brand2]` | 100+ | P2 |

### 2.2 Outer Section (Authority Building)

The Outer Section builds topical authority through historical data accumulation.

| Page Type | URL Pattern | Scale | Priority |
|-----------|-------------|-------|----------|
| Brand Pages | `/brands/[brand]` | 15+ | P1 |
| Technology Explainers | `/learn/[topic]` | 30+ | P2 |
| Spec Deep Dives | `/specs/[category]` | 20+ | P2 |
| Buying Guides | `/guides/[topic]` | 20+ | P3 |
| News/Updates | `/news/[slug]` | Ongoing | P3 |

---

## Part 3: Implementation Phases

### Phase 1: Foundation (Week 1-2)

#### 1.1 Database Migration

Move from hardcoded `allPhones` array to Supabase PostgreSQL.

**Schema Design:**

```sql
-- Brands table
CREATE TABLE brands (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  logo_url TEXT,
  description TEXT,
  founded_year INTEGER,
  headquarters VARCHAR(200),
  website_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Phones table
CREATE TABLE phones (
  id SERIAL PRIMARY KEY,
  brand_id INTEGER REFERENCES brands(id),
  model VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL,
  price DECIMAL(10,2),
  release_date DATE,
  image_url TEXT,
  images TEXT[], -- Array of additional image URLs
  youtube_video_id VARCHAR(20),
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(brand_id, slug)
);

-- Phone specs (JSONB for flexibility with 200+ fields)
CREATE TABLE phone_specs (
  id SERIAL PRIMARY KEY,
  phone_id INTEGER REFERENCES phones(id) UNIQUE,
  network JSONB,
  launch JSONB,
  body JSONB,
  display JSONB,
  platform JSONB,
  memory JSONB,
  main_camera JSONB,
  selfie_camera JSONB,
  audio JSONB,
  connectivity JSONB,
  sensors JSONB,
  battery JSONB,
  software JSONB,
  build_quality JSONB,
  thermal_performance JSONB,
  imaging_features JSONB,
  display_extras JSONB,
  gaming_input JSONB,
  wireless_positioning JSONB,
  security JSONB,
  packaging JSONB,
  pricing_retail JSONB,
  value_ratings JSONB
);

-- Categories for ranking pages
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  meta_title VARCHAR(200),
  meta_description VARCHAR(300),
  spec_weights JSONB, -- Weights for ranking algorithm
  created_at TIMESTAMP DEFAULT NOW()
);

-- Technology topics for explainer pages
CREATE TABLE tech_topics (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  content TEXT,
  meta_title VARCHAR(200),
  meta_description VARCHAR(300),
  related_spec_field VARCHAR(100),
  related_phone_ids INTEGER[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Buying guides
CREATE TABLE guides (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  content TEXT,
  meta_title VARCHAR(200),
  meta_description VARCHAR(300),
  category_id INTEGER REFERENCES categories(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_phones_brand ON phones(brand_id);
CREATE INDEX idx_phones_slug ON phones(slug);
CREATE INDEX idx_phones_price ON phones(price);
CREATE INDEX idx_brands_slug ON brands(slug);
```

#### 1.2 URL Architecture

**Current → New URL Structure:**

| Current | New | Reason |
|---------|-----|--------|
| `/[brand]/[model]` | `/phones/[brand]/[model]` | More semantic, avoids route conflicts |
| `/compare/[slug]` | `/compare/[phone1]-vs-[phone2]` | SEO-friendly, descriptive |
| `/brands` | `/brands` | Keep as listing page |
| NEW | `/brands/[brand]` | Individual brand pages |
| NEW | `/best/[category]` | Category ranking pages |
| NEW | `/best/phones-under-[price]` | Price range pages |
| NEW | `/compare/brands/[brand1]-vs-[brand2]` | Brand comparison pages |
| NEW | `/learn/[topic]` | Technology explainers |
| NEW | `/specs/[category]` | Spec deep dives |
| NEW | `/guides/[topic]` | Buying guides |

#### 1.3 SEO Infrastructure Setup

**File: `src/app/phones/[brand]/[model]/page.tsx`**

```typescript
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPhoneBySlug, getAllPhones } from '@/lib/db';
import { PhoneDetailsClient } from './components/phone-details-client';
import { generatePhoneSchema } from '@/lib/schema';

interface Props {
  params: { brand: string; model: string };
}

// Generate static params for all phones
export async function generateStaticParams() {
  const phones = await getAllPhones();
  return phones.map((phone) => ({
    brand: phone.brand.slug,
    model: phone.slug,
  }));
}

// Generate SEO metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const phone = await getPhoneBySlug(params.brand, params.model);
  if (!phone) return {};

  return {
    title: `${phone.brand.name} ${phone.model} Specs, Price & Review | MobilePhonesPro`,
    description: `Full specifications for ${phone.brand.name} ${phone.model}: ${phone.specs.display.size_inches}" ${phone.specs.display.panel_type}, ${phone.specs.main_camera.main_sensor_resolution} camera, ${phone.specs.platform.chipset}, ${phone.specs.battery.capacity_mah}mAh battery. Price: $${phone.price}.`,
    openGraph: {
      title: `${phone.brand.name} ${phone.model} Specifications`,
      description: `Compare specs, read reviews, and find the best price for ${phone.brand.name} ${phone.model}.`,
      images: [phone.image_url],
    },
    alternates: {
      canonical: `/phones/${params.brand}/${params.model}`,
    },
  };
}

export default async function PhonePage({ params }: Props) {
  const phone = await getPhoneBySlug(params.brand, params.model);
  if (!phone) notFound();

  const schema = generatePhoneSchema(phone);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PhoneDetailsClient phone={phone} />
    </>
  );
}
```

---

### Phase 2: Core Section Pages (Week 3-4)

#### 2.1 Phone Specification Pages

**Enhancements:**
- Add `generateStaticParams` for SSG
- Implement JSON-LD schema (Product, MobilePhone)
- Add internal linking section
- Optimize heading hierarchy

**Internal Linking Requirements:**
- Link to brand page
- Link to 5-10 most relevant comparison pages
- Link to 3-5 category pages where phone ranks
- Link to similar phones (same brand, same price range)

**Schema Markup:**

```typescript
// src/lib/schema.ts
export function generatePhoneSchema(phone: Phone) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${phone.brand.name} ${phone.model}`,
    description: `${phone.brand.name} ${phone.model} smartphone with ${phone.specs.display.size_inches}" display, ${phone.specs.main_camera.main_sensor_resolution} camera`,
    brand: {
      '@type': 'Brand',
      name: phone.brand.name,
    },
    offers: {
      '@type': 'Offer',
      price: phone.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '186',
    },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Display Size', value: `${phone.specs.display.size_inches} inches` },
      { '@type': 'PropertyValue', name: 'Camera', value: phone.specs.main_camera.main_sensor_resolution },
      { '@type': 'PropertyValue', name: 'Battery', value: `${phone.specs.battery.capacity_mah}mAh` },
      { '@type': 'PropertyValue', name: 'Processor', value: phone.specs.platform.chipset },
    ],
  };
}
```

#### 2.2 Programmatic Comparison Pages

**File: `src/app/compare/[...slugs]/page.tsx`**

```typescript
import { Metadata } from 'next';
import { getAllPhones, getPhonesByIds } from '@/lib/db';
import { CompareClient } from './components/compare-client';
import { generateComparisonSchema } from '@/lib/schema';

interface Props {
  params: { slugs: string[] };
}

// Generate all possible comparison combinations
export async function generateStaticParams() {
  const phones = await getAllPhones();
  const params: { slugs: string[] }[] = [];
  
  // Generate all unique pairs
  for (let i = 0; i < phones.length; i++) {
    for (let j = i + 1; j < phones.length; j++) {
      params.push({
        slugs: [phones[i].slug, 'vs', phones[j].slug],
      });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [phone1Slug, , phone2Slug] = params.slugs;
  const phones = await getPhonesByIds([phone1Slug, phone2Slug]);
  
  if (phones.length !== 2) return {};
  
  const [phone1, phone2] = phones;
  
  return {
    title: `${phone1.brand.name} ${phone1.model} vs ${phone2.brand.name} ${phone2.model}: Full Comparison | MobilePhonesPro`,
    description: `Compare ${phone1.brand.name} ${phone1.model} vs ${phone2.brand.name} ${phone2.model} specs side by side. See which phone wins in display, camera, battery, performance & value.`,
    alternates: {
      canonical: `/compare/${phone1.slug}-vs-${phone2.slug}`,
    },
  };
}

export default async function ComparePage({ params }: Props) {
  const [phone1Slug, , phone2Slug] = params.slugs;
  const phones = await getPhonesByIds([phone1Slug, phone2Slug]);
  
  const schema = generateComparisonSchema(phones);
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <CompareClient phones={phones} />
    </>
  );
}
```

#### 2.3 Category Ranking Pages

**Categories to Create:**

| Category | Slug | Ranking Criteria |
|----------|------|------------------|
| Best Camera Phones | `camera-phones` | main_camera resolution, sensor size, OIS |
| Best Gaming Phones | `gaming-phones` | chipset benchmark, refresh rate, cooling |
| Best Battery Life | `battery-life` | capacity, endurance rating |
| Best Display | `display` | resolution, brightness, refresh rate |
| Best Value | `value` | spec score / price ratio |
| Best Compact | `compact-phones` | dimensions, weight |
| Best Foldable | `foldable-phones` | form factor = foldable |
| Best 5G | `5g-phones` | 5G band support |
| Best for Photography | `photography` | camera features, RAW support |
| Best for Video | `video-recording` | 4K/8K support, stabilization |

**File: `src/app/best/[category]/page.tsx`**

```typescript
import { Metadata } from 'next';
import { getCategoryBySlug, getPhonesByCategory } from '@/lib/db';
import { CategoryRankingClient } from './components/category-ranking-client';

interface Props {
  params: { category: string };
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategoryBySlug(params.category);
  if (!category) return {};
  
  return {
    title: `Best ${category.name} 2026 | Top 10 Ranked | MobilePhonesPro`,
    description: `Discover the best ${category.name.toLowerCase()} of 2026. Our experts ranked the top 10 phones. Compare specs, prices & find your perfect phone.`,
    alternates: {
      canonical: `/best/${params.category}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const category = await getCategoryBySlug(params.category);
  const phones = await getPhonesByCategory(params.category, 10);
  
  return <CategoryRankingClient category={category} phones={phones} />;
}
```

#### 2.4 Price Range Pages

**Price Ranges:**
- Under $300
- Under $500
- Under $700
- Under $1000
- Under $1500

**File: `src/app/best/phones-under-[price]/page.tsx`**

```typescript
import { Metadata } from 'next';
import { getPhonesByPriceRange } from '@/lib/db';
import { PriceRangeClient } from './components/price-range-client';

interface Props {
  params: { price: string };
}

const PRICE_RANGES = [300, 500, 700, 1000, 1500];

export async function generateStaticParams() {
  return PRICE_RANGES.map((price) => ({ price: price.toString() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const price = parseInt(params.price);
  
  return {
    title: `Best Phones Under $${price} in 2026 | Top Picks | MobilePhonesPro`,
    description: `Looking for the best phones under $${price}? We've ranked the top options with the best value, camera, battery & performance in this price range.`,
    alternates: {
      canonical: `/best/phones-under-${price}`,
    },
  };
}

export default async function PriceRangePage({ params }: Props) {
  const price = parseInt(params.price);
  const phones = await getPhonesByPriceRange(0, price, 20);
  
  return <PriceRangeClient maxPrice={price} phones={phones} />;
}
```

---

### Phase 3: Outer Section Pages (Week 5-6)

#### 3.1 Brand Pages

**File: `src/app/brands/[brand]/page.tsx`**

```typescript
import { Metadata } from 'next';
import { getBrandBySlug, getPhonesByBrand } from '@/lib/db';
import { BrandPageClient } from './components/brand-page-client';

interface Props {
  params: { brand: string };
}

export async function generateStaticParams() {
  const brands = await getAllBrands();
  return brands.map((brand) => ({ brand: brand.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const brand = await getBrandBySlug(params.brand);
  if (!brand) return {};
  
  return {
    title: `${brand.name} Phones - All Models & Specs | MobilePhonesPro`,
    description: `Explore all ${brand.name} phones. Compare specs, prices, and find the best ${brand.name} smartphone for you. ${brand.phone_count}+ devices listed.`,
    alternates: {
      canonical: `/brands/${params.brand}`,
    },
  };
}

export default async function BrandPage({ params }: Props) {
  const brand = await getBrandBySlug(params.brand);
  const phones = await getPhonesByBrand(params.brand);
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brand.name,
    url: brand.website_url,
    logo: brand.logo_url,
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <BrandPageClient brand={brand} phones={phones} />
    </>
  );
}
```

#### 3.2 Technology Explainer Pages

**Topics to Create:**

| Topic | Slug | Related Spec Field |
|-------|------|-------------------|
| What is OLED? | `what-is-oled` | display.panel_type |
| What is AMOLED? | `what-is-amoled` | display.panel_type |
| 5G Explained | `5g-explained` | network.5g_bands |
| What is OIS? | `what-is-ois` | main_camera.ois_type |
| Understanding Refresh Rates | `refresh-rates-explained` | display.refresh_rate_hz |
| What is IP68? | `what-is-ip68` | body.ip_rating |
| Camera Sensors Explained | `camera-sensors-explained` | main_camera.sensor_brand_model |
| What is Fast Charging? | `fast-charging-explained` | battery.wired_charging_wattage |
| Understanding Chipsets | `chipsets-explained` | platform.chipset |
| What is UFS Storage? | `ufs-storage-explained` | memory.storage_type |

#### 3.3 Spec Deep Dive Pages

**Categories:**

| Category | Slug | Content Focus |
|----------|------|---------------|
| Display | `display` | Panel types, resolution, refresh rate |
| Camera | `camera` | Sensors, lenses, computational photography |
| Battery | `battery` | Capacity, charging, endurance |
| Processor | `processor` | Chipsets, benchmarks, efficiency |
| Connectivity | `connectivity` | 5G, WiFi, Bluetooth |
| Build Quality | `build-quality` | Materials, durability, IP ratings |

#### 3.4 Buying Guides

**Guides to Create:**

| Guide | Slug |
|-------|------|
| How to Choose a Phone | `how-to-choose-a-phone` |
| Flagship vs Midrange | `flagship-vs-midrange` |
| Android vs iPhone | `android-vs-iphone` |
| Best Phone for Photography | `best-phone-for-photography` |
| Best Phone for Gaming | `best-phone-for-gaming` |
| Best Phone for Business | `best-phone-for-business` |

---

### Phase 4: Internal Linking Strategy (Week 7)

#### 4.1 Semantic Content Network

**Phone Pages Link To:**
- Brand page (1 link)
- 5-10 most relevant comparison pages
- 3-5 category pages where phone ranks in top 10
- 3-5 similar phones (same brand, same price range)
- Related technology explainer pages

**Comparison Pages Link To:**
- Both phone detail pages
- Both brand pages
- 3-5 related comparisons (same brand matchups, similar price)
- Category pages for winning specs

**Category Pages Link To:**
- Top 10 phones in that category
- Related category pages
- Relevant comparison pages
- Related buying guides

**Brand Pages Link To:**
- All phones from that brand
- Brand vs brand comparison pages
- Top phones by category for that brand

#### 4.2 Link Component

```typescript
// src/components/internal-links.tsx
interface InternalLinksProps {
  phone: Phone;
  comparisons: Comparison[];
  categories: Category[];
  similarPhones: Phone[];
}

export function InternalLinks({ phone, comparisons, categories, similarPhones }: InternalLinksProps) {
  return (
    <div className="mt-8 space-y-6">
      <section>
        <h3 className="text-lg font-semibold mb-3">Compare {phone.model}</h3>
        <div className="flex flex-wrap gap-2">
          {comparisons.map((comp) => (
            <Link 
              key={comp.slug}
              href={`/compare/${comp.slug}`}
              className="text-primary hover:underline"
            >
              {phone.model} vs {comp.otherPhone.model}
            </Link>
          ))}
        </div>
      </section>
      
      <section>
        <h3 className="text-lg font-semibold mb-3">{phone.model} Rankings</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link 
              key={cat.slug}
              href={`/best/${cat.slug}`}
              className="text-primary hover:underline"
            >
              #{cat.rank} in Best {cat.name}
            </Link>
          ))}
        </div>
      </section>
      
      <section>
        <h3 className="text-lg font-semibold mb-3">Similar Phones</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {similarPhones.map((p) => (
            <PhoneCard key={p.id} phone={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
```

---

### Phase 5: Schema Markup (Week 8)

#### 5.1 Schema Types by Page

| Page Type | Schema Types |
|-----------|--------------|
| Phone Specs | Product, MobilePhone, Review, AggregateRating, BreadcrumbList |
| Comparison | ItemList, Product (x2), BreadcrumbList |
| Category | ItemList, CollectionPage, BreadcrumbList |
| Price Range | ItemList, CollectionPage, BreadcrumbList |
| Brand | Organization, Brand, ItemList, BreadcrumbList |
| Tech Explainer | Article, HowTo, BreadcrumbList |
| Buying Guide | HowTo, Article, BreadcrumbList |

#### 5.2 Breadcrumb Schema

```typescript
// src/lib/schema.ts
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://mobilephonespro.com${item.url}`,
    })),
  };
}
```

---

### Phase 6: Sitemap & Indexing (Week 9)

#### 6.1 Dynamic Sitemap

**File: `src/app/sitemap.ts`**

```typescript
import { MetadataRoute } from 'next';
import { getAllPhones, getAllBrands, getAllCategories } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://mobilephonespro.com';
  const phones = await getAllPhones();
  const brands = await getAllBrands();
  const categories = await getAllCategories();
  
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/brands`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/compare`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ];
  
  // Phone pages
  const phonePages = phones.map((phone) => ({
    url: `${baseUrl}/phones/${phone.brand.slug}/${phone.slug}`,
    lastModified: phone.updated_at,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));
  
  // Comparison pages (top 1000 most popular)
  const comparisonPages = generateTopComparisons(phones, 1000).map((comp) => ({
    url: `${baseUrl}/compare/${comp.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  
  // Category pages
  const categoryPages = categories.map((cat) => ({
    url: `${baseUrl}/best/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  
  // Brand pages
  const brandPages = brands.map((brand) => ({
    url: `${baseUrl}/brands/${brand.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
  
  return [...staticPages, ...phonePages, ...comparisonPages, ...categoryPages, ...brandPages];
}
```

#### 6.2 Robots.txt

**File: `src/app/robots.ts`**

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/search?'],
      },
    ],
    sitemap: 'https://mobilephonespro.com/sitemap.xml',
  };
}
```

---

### Phase 7: Performance & Monitoring (Week 10)

#### 7.1 ISR Configuration

```typescript
// In each page file
export const revalidate = 86400; // Revalidate every 24 hours
```

#### 7.2 Image Optimization

- Use `next/image` for all phone images
- Implement responsive images with `sizes` prop
- Use WebP format with fallbacks

#### 7.3 Monitoring Setup

- Google Search Console integration
- Structured data testing
- Core Web Vitals monitoring
- Indexing status tracking

---

## Part 4: Meta Templates

### 4.1 Phone Specification Pages

**Title**: `{Brand} {Model} Specs, Price & Review | MobilePhonesPro`

**Description**: `Full specifications for {Brand} {Model}: {Display Size}" {Display Type}, {Camera MP} camera, {Chipset}, {Battery mAh} battery. Price: ${Price}. Compare specs & read reviews.`

### 4.2 Comparison Pages

**Title**: `{Phone1} vs {Phone2}: Full Comparison | MobilePhonesPro`

**Description**: `Compare {Phone1} vs {Phone2} specs side by side. See which phone wins in display, camera, battery, performance & value. Detailed comparison with winner highlights.`

### 4.3 Category Pages

**Title**: `Best {Category} Phones 2026 | Top 10 Ranked | MobilePhonesPro`

**Description**: `Discover the best {category} phones of 2026. Our experts ranked the top 10 phones for {category use case}. Compare specs, prices & find your perfect phone.`

### 4.4 Price Range Pages

**Title**: `Best Phones Under ${Price} in 2026 | Top Picks | MobilePhonesPro`

**Description**: `Looking for the best phones under ${Price}? We've ranked the top options with the best value, camera, battery & performance in this price range.`

### 4.5 Brand Pages

**Title**: `{Brand} Phones - All Models & Specs | MobilePhonesPro`

**Description**: `Explore all {Brand} phones. Compare specs, prices, and find the best {Brand} smartphone for you. {Count}+ devices listed.`

---

## Part 5: Success Metrics

### 5.1 Technical Metrics

- [ ] All pages pass Google Rich Results Test
- [ ] Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] 100% of pages indexed in Google Search Console
- [ ] Sitemap submitted and processed

### 5.2 SEO Metrics (3-6 months)

- [ ] Organic traffic increase: Target 500% growth
- [ ] Indexed pages: Target 5,000+
- [ ] Average position improvement: Target top 10 for category keywords
- [ ] Featured snippets: Target 50+ comparison queries

### 5.3 Authority Metrics (6-12 months)

- [ ] Domain Rating increase
- [ ] Referring domains growth
- [ ] Brand search volume increase
- [ ] AI Overview citations

---

## Part 6: Implementation Checklist

### Week 1-2: Foundation
- [ ] Set up Supabase database with schema
- [ ] Migrate phone data from hardcoded array
- [ ] Implement new URL structure
- [ ] Set up SEO infrastructure (metadata, canonical URLs)

### Week 3-4: Core Section
- [ ] Enhance phone specification pages
- [ ] Build programmatic comparison pages
- [ ] Create category ranking pages
- [ ] Create price range pages

### Week 5-6: Outer Section
- [ ] Build individual brand pages
- [ ] Create technology explainer pages
- [ ] Create spec deep dive pages
- [ ] Create buying guides

### Week 7: Internal Linking
- [ ] Implement semantic content network
- [ ] Add internal links to all page types
- [ ] Verify link structure with crawl

### Week 8: Schema Markup
- [ ] Implement JSON-LD for all page types
- [ ] Add breadcrumb schema
- [ ] Test with Google Rich Results Test

### Week 9: Sitemap & Indexing
- [ ] Generate dynamic sitemap
- [ ] Configure robots.txt
- [ ] Submit to Google Search Console

### Week 10: Performance & Launch
- [ ] Optimize Core Web Vitals
- [ ] Set up monitoring
- [ ] Launch and monitor indexing

### Week 11-12: Geo-Based Pricing & Affiliate Integration
- [ ] Set up countries and retailers tables in Supabase
- [ ] Implement geo-detection system (Vercel headers + timezone fallback)
- [ ] Create price display component with geo-aware pricing
- [ ] Join affiliate programs (Amazon Associates for all 7 countries)
- [ ] Implement affiliate link generation for each retailer
- [ ] Add FTC disclosure component
- [ ] Set up price scraping scripts (headless Selenium + ChromeDriver)
- [ ] Create API endpoint for fetching prices by country

### Week 13: Ad Revenue Integration
- [ ] Apply for Google AdSense
- [ ] Implement AdSense components
- [ ] Add ad placements (header, in-content, sidebar, footer)
- [ ] Test ad rendering and responsiveness
- [ ] Set up ad performance tracking

### Week 14: Multi-Currency & Price Updates
- [ ] Implement currency conversion utilities
- [ ] Set up exchange rate caching (daily updates)
- [ ] Create price history tracking
- [ ] Build price comparison charts
- [ ] Set up cron jobs for price updates (every 6-24 hours)

### Week 15: Monetization Optimization
- [ ] A/B test affiliate button placements
- [ ] Optimize ad placements for RPM
- [ ] Set up conversion tracking
- [ ] Monitor affiliate earnings dashboard
- [ ] Plan migration to Ezoic/Mediavine at 50K+ traffic

---

## Appendix A: File Structure

```
src/
├── app/
│   ├── phones/
│   │   └── [brand]/
│   │       └── [model]/
│   │           ├── page.tsx
│   │           └── components/
│   ├── compare/
│   │   ├── page.tsx
│   │   └── [...slugs]/
│   │       └── page.tsx
│   ├── best/
│   │   ├── [category]/
│   │   │   └── page.tsx
│   │   └── phones-under-[price]/
│   │       └── page.tsx
│   ├── brands/
│   │   ├── page.tsx
│   │   └── [brand]/
│   │       └── page.tsx
│   ├── learn/
│   │   └── [topic]/
│   │       └── page.tsx
│   ├── specs/
│   │   └── [category]/
│   │       └── page.tsx
│   ├── guides/
│   │   └── [topic]/
│   │       └── page.tsx
│   ├── api/
│   │   └── prices/
│   │       └── [phoneId]/
│   │           └── route.ts      # Geo-based pricing API
│   ├── sitemap.ts
│   └── robots.ts
├── lib/
│   ├── db.ts
│   ├── schema.ts
│   ├── types.ts
│   ├── utils.ts
│   ├── geo.ts                    # Geo-detection utilities
│   ├── affiliate.ts              # Affiliate link generation
│   ├── currency.ts               # Multi-currency support
│   └── scoring.ts                # Spec-based scoring system
├── components/
│   ├── internal-links.tsx
│   ├── phone-card.tsx
│   ├── comparison-table.tsx
│   ├── price-display.tsx         # Geo-aware price display
│   ├── affiliate-disclosure.tsx  # FTC disclosure
│   └── ads/
│       └── adsense-unit.tsx      # Google AdSense component
└── scripts/
    └── scrape-prices.ts          # Price scraping cron job
```

---

## Appendix B: Affiliate Program Links

| Program | Sign Up URL | Requirements |
|---------|-------------|--------------|
| Amazon Associates (US) | https://affiliate-program.amazon.com | Website with content |
| Amazon Associates (IN) | https://affiliate-program.amazon.in | Indian address |
| Amazon Associates (UK) | https://affiliate-program.amazon.co.uk | UK address |
| Amazon Associates (CA) | https://affiliate-program.amazon.ca | Canadian address |
| Amazon Associates (AU) | https://affiliate-program.amazon.com.au | Australian address |
| Amazon Associates (DE) | https://partnernet.amazon.de | German address |
| Amazon Associates (AE) | https://affiliate-program.amazon.ae | UAE address |
| Flipkart Affiliate | https://affiliate.flipkart.com | Indian bank account |
| Impact Radius | https://impact.com | For Best Buy, Walmart |
| Awin | https://www.awin.com | For Currys, MediaMarkt |
| Commission Factory | https://www.commissionfactory.com | For JB Hi-Fi |

---

*This roadmap follows Koray Tugberk Gubur's Semantic SEO framework, emphasizing Topical Authority through comprehensive coverage, Cost of Retrieval optimization, and Semantic Content Networks. The monetization strategy focuses on geo-based affiliate commissions and ad revenue across 7 Tier 1 countries.*
