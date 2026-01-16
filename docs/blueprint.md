# **App Name**: MobilePhonesPro (MPP)

## Project Vision

MobilePhonesPro is a **free global mobile phone comparison platform** designed to help users make informed purchase decisions. The platform aims to become the authoritative resource for mobile phone specifications, comparisons, and purchase guidance across 12,000+ phone models and 117+ brands.

## Core Features

### User-Facing Features
- **Advanced Search**: Search phones by name, brand, or 50+ specification filters
- **4-Phone Comparison**: Compare up to four phones side-by-side (unique in market)
- **Spec-Based Scoring**: Transparent algorithmic ratings out of 100 (no AI black-box)
- **Geo-Based Pricing**: Display prices in local currency with regional retailer links
- **Wishlist**: Save phones for later comparison
- **Shareable URLs**: Share comparison results with others

### Admin Features
- **AI Spec Generator**: Generate 212 specifications per phone using Gemini AI
- **Content Automation**: AI-powered homepage content generation
- **Phone Management**: CRUD operations for 12,000+ phone catalog
- **SEO Management**: Meta tags, sitemap generation, schema markup

## Business Model

| Revenue Stream | Description |
|----------------|-------------|
| Affiliate Commissions | Geo-based affiliate links to Amazon, Flipkart, Best Buy, etc. |
| Ad Revenue | Google AdSense and premium ad networks |

## Target Markets

India, USA, UK, Canada, Australia, Germany, UAE (Tier 1 countries)

## Data Pipeline

| Source | Data Type |
|--------|-----------|
| GSMArena | Core hardware specs (~88 fields) |
| 91mobiles | India pricing, ratings |
| Geekbench Browser | Official benchmark scores |
| Gemini AI | Unique specs (77 fields) - thermal, gaming, security |

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
- **Authentication**: Supabase Auth (Google OAuth)
- **AI**: Google Genkit + Gemini 2.5 Flash
- **Scraping**: Firecrawl.dev
- **Deployment**: Vercel

## Key Differentiators

1. **4-Phone Comparison** - No competitor offers this
2. **212 Spec Fields** - Most comprehensive database
3. **Transparent Scoring** - No AI black-box recommendations
4. **Modern UI** - Better than GSMArena's dated design
5. **Global Geo-Pricing** - Localized prices and retailers
