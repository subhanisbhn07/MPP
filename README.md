# MobilePhonesPro (MPP) - Global Mobile Phone Comparison Platform

A comprehensive mobile phone comparison platform built with Next.js, designed for Programmatic SEO (PSEO) at scale. MPP aims to become the authoritative global resource for mobile phone specifications, comparisons, and purchase decisions.

## Table of Contents

1. [Project Vision](#1-project-vision)
2. [Key Differentiators](#2-key-differentiators)
3. [Technology Stack](#3-technology-stack)
4. [Data Pipeline](#4-data-pipeline)
5. [Database Schema](#5-database-schema)
6. [Monetization Strategy](#6-monetization-strategy)
7. [Getting Started](#7-getting-started)
8. [Frontend Pages](#8-frontend-pages)
9. [Admin Panel](#9-admin-panel)
10. [Roadmap](#10-roadmap)

---

## 1. Project Vision

MobilePhonesPro is a **free global platform** that helps users:
- Compare mobile phone specifications in detail (up to 4 phones side-by-side)
- Make informed purchase decisions with real-time pricing
- Access comprehensive data on 12,000+ phone models across 117+ brands

### Business Model

| Revenue Stream | Description |
|----------------|-------------|
| **Affiliate Commissions** | Geo-based affiliate links to retailers (Amazon, Flipkart, Best Buy, etc.) |
| **Ad Revenue** | Google AdSense and premium ad networks |

### Target Markets

India, USA, UK, Canada, Australia, Germany, UAE (Tier 1 countries)

---

## 2. Key Differentiators

1. **4-Phone Side-by-Side Comparison** - No major competitor offers this
2. **Spec-Based Scoring System** - Transparent algorithmic scoring (no AI black-box)
3. **212 Specification Fields** - Most comprehensive database per phone
4. **Real-Time Affiliate Pricing** - Always accurate prices from retailer APIs
5. **Modern, Clean UI** - Better than GSMArena's dated design

---

## 3. Technology Stack

| Component | Technology |
|-----------|------------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + ShadCN/UI |
| **Database** | Supabase (PostgreSQL) |
| **Authentication** | Supabase Auth + Firebase Auth |
| **AI** | Google Genkit + Gemini |
| **Scraping** | Firecrawl.dev |
| **Deployment** | Vercel |

---

## 4. Data Pipeline

### 4.1 Data Architecture

Phone specifications are **static** - once a phone is released, its hardware specs never change. Therefore, we scrape specs **once per phone**, not on a recurring schedule.

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Firecrawl     │────▶│   Normalizer    │────▶│    Supabase     │
│   (Scraping)    │     │   (Transform)   │     │   (Storage)     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### 4.2 Data Sources

| Source | Data Type | Frequency |
|--------|-----------|-----------|
| **GSMArena** | Hardware specs, dimensions, display, battery, camera, images | Once per phone |
| **NanoReview** | Benchmark scores (AnTuTu, Geekbench) | Once per phone |
| **Official Sites** | Launch date, MSRP, official images | Once per phone |
| **Gemini AI** | 77 MPP-unique specs (thermal, gaming, security) | Once per phone |
| **Affiliate APIs** | Real-time pricing | On-demand (live) |

### 4.3 Pricing Strategy

**Static scraped prices become outdated quickly.** Instead, we use real-time affiliate APIs:

| Source | API | Coverage |
|--------|-----|----------|
| Amazon PA-API | Product Advertising API | Global (US, UK, India, Germany, etc.) |
| Flipkart Affiliate | Flipkart API | India |

Prices are fetched **on-demand** when users view a phone page, ensuring always-accurate pricing.

### 4.4 Image Handling

| Approach | Description |
|----------|-------------|
| **MVP** | Store image URLs from GSMArena |
| **Production** | Download and host in Supabase Storage |

### 4.5 When We Scrape

1. **Initial bulk scrape** - One-time to populate all existing phones
2. **New phone launches** - Scrape only when a new phone is announced
3. **Manual corrections** - Admin triggers re-scrape if data has errors

---

## 5. Database Schema

### Core Tables

| Table | Purpose |
|-------|---------|
| `brands` | Phone manufacturers (Samsung, Apple, etc.) |
| `phones` | Basic phone info (model, slug, images, price) |
| `phone_specs` | Detailed specs in JSONB columns (20+ categories) |
| `categories` | Phone categories (Flagship, Gaming, Budget, etc.) |
| `phone_categories` | Many-to-many phone-category relationships |
| `comparisons` | Pre-generated comparison pages |
| `price_history` | Historical price tracking |
| `affiliate_links` | Product IDs for affiliate APIs |
| `user_reviews` | User ratings and reviews |

---

## 6. Monetization Strategy

### Affiliate Revenue

| Retailer | Countries | Commission |
|----------|-----------|------------|
| Amazon Associates | US, UK, IN, DE, etc. | 1-4% |
| Flipkart Affiliate | India | 2-5% |
| Best Buy | US | 0.5-1% |

### Ad Revenue

- Google AdSense for display ads
- Premium ad networks for higher CPM

---

## 7. Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Firecrawl API key (for scraping)

### Installation

```bash
# Clone the repository
git clone https://github.com/subhanisbhn07/MPP.git
cd MPP

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Run development server
npm run dev
```

The application will be available at `http://localhost:9002`.

---

## 8. Frontend Pages

| Page | Route | Description |
|------|-------|-------------|
| Homepage | `/` | Featured phones, categories, news |
| Search | `/search` | Advanced search with 50+ filters |
| Phone Details | `/[brand]/[model]` | Full spec breakdown |
| Comparison | `/compare/[slug]` | Side-by-side comparison (up to 4) |
| Brands | `/brands` | All phone manufacturers |
| Categories | `/category/[slug]` | Best phones by category |

---

## 9. Admin Panel (`/admin`)

The admin panel provides:
- **Phone Management**: Add, edit, delete phones
- **AI Spec Generator**: Generate specs using Gemini AI
- **Content Automation**: Generate homepage content
- **Data Import**: Bulk import from CSV/JSON
- **Scraper Controls**: Trigger scraping jobs

See [Admin README](./src/app/admin/README.md) for details.

---

## 10. Roadmap

### Phase 1: Foundation (Completed)
- [x] Next.js frontend with all page templates
- [x] Admin panel with AI spec generation
- [x] 4-phone comparison feature
- [x] Supabase database schema
- [x] Vercel deployment

### Phase 2: Data Pipeline (Current)
- [ ] GSMArena scraper for specs + images
- [ ] Affiliate link mapping (Amazon ASINs)
- [ ] Real-time pricing API endpoint
- [ ] Benchmark scraper (NanoReview)

### Phase 3: Monetization
- [ ] Amazon PA-API integration
- [ ] Flipkart Affiliate integration
- [ ] Ad network setup

### Phase 4: SEO & Scale
- [ ] Programmatic page generation
- [ ] Sitemap optimization
- [ ] Schema markup (JSON-LD)

---

## Links

- **Live Site**: https://mpp-beige.vercel.app
- **Repository**: https://github.com/subhanisbhn07/MPP

---

## License

All rights reserved. This project is proprietary software.
