# **App Name**: MobilePhonesPro (MPP)

## Project Vision

MobilePhonesPro is a **free global mobile phone comparison platform** designed to help users make informed purchase decisions. The platform aims to become the authoritative resource for mobile phone specifications, comparisons, and purchase guidance across 12,000+ phone models and 117+ brands.

## Core Features

### User-Facing Features
- **Advanced Search**: Search phones by name, brand, or 50+ specification filters
- **4-Phone Comparison**: Compare up to four phones side-by-side (unique in market)
- **Spec-Based Scoring**: Transparent algorithmic ratings out of 100 (no AI black-box)
- **Real-Time Pricing**: Live prices from affiliate APIs (Amazon, Flipkart)
- **Wishlist**: Save phones for later comparison
- **Shareable URLs**: Share comparison results with others

### Admin Features
- **AI Spec Generator**: Generate specifications using Gemini AI
- **Content Automation**: AI-powered homepage content generation
- **Phone Management**: CRUD operations for phone catalog
- **Scraper Controls**: Trigger data scraping jobs

## Business Model

| Revenue Stream | Description |
|----------------|-------------|
| Affiliate Commissions | Geo-based affiliate links to Amazon, Flipkart, Best Buy, etc. |
| Ad Revenue | Google AdSense and premium ad networks |

## Target Markets

India, USA, UK, Canada, Australia, Germany, UAE (Tier 1 countries)

## Data Pipeline

| Source | Data Type | Frequency |
|--------|-----------|-----------|
| GSMArena | Core hardware specs, images | Once per phone |
| NanoReview | Benchmark scores | Once per phone |
| Affiliate APIs | Real-time pricing | On-demand |
| Gemini AI | Unique specs (thermal, gaming, security) | Once per phone |

**Key Insight**: Phone specs are static - they never change after release. We scrape once per phone, not on a recurring schedule. Prices are fetched in real-time from affiliate APIs.

## Style Guidelines

- **Primary color**: Vibrant blue (#29ABE2) - trust and reliability for tech
- **Background color**: Light gray (#F0F2F5) - clean, neutral backdrop
- **Accent color**: Vivid purple (#9C27B0) - interactive elements and CTAs
- **Typography**: 'Inter' - modern grotesque sans-serif
- **Icons**: Simple, modern line icons for phone features
- **Layout**: Clean, responsive grid optimized for mobile and desktop
- **Animations**: Subtle transitions for navigation and comparisons
- **Dark Mode**: Full dark mode support

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + ShadCN/UI
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth + Firebase Auth
- **AI**: Google Genkit + Gemini
- **Scraping**: Firecrawl.dev
- **Deployment**: Vercel

## Key Differentiators

1. **4-Phone Comparison** - No competitor offers this
2. **212 Spec Fields** - Most comprehensive database
3. **Transparent Scoring** - No AI black-box recommendations
4. **Real-Time Pricing** - Always accurate from affiliate APIs
5. **Modern UI** - Better than GSMArena's dated design
