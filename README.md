# Vastraabharana E-Commerce Store — Complete Architecture & Asset Snapshot

> **Snapshot Date:** October 28, 2026  
> **Target URL:** [https://vastraabharana.com](https://vastraabharana.com)  
> **Platform:** Shopify Online Store 2.0 (Theme: Dawn v15.3.0)  
> **Shopify Shop Domain:** `vastrabharana.myshopify.com`  

---

## 📁 Repository Directory Structure

```text
VA Website/
├── html_pages/              # Complete static HTML snapshots of all core pages
│   ├── index.html           # Homepage (825 KB rendered)
│   ├── about-us.html        # Brand story & bulk order information
│   ├── contact.html         # Official address, GSTIN, legal details
│   ├── terms-conditions.html# Comprehensive legal terms & conditions
│   ├── privacy-policy.html  # Data privacy policy & cookies
│   ├── returns-cancellations.html # 5-day exchange policy
│   ├── shipping-policy.html # Domestic & international shipping details
│   ├── sitemap.xml          # Parent sitemap index
│   ├── robots.txt           # Crawling rules & agentic discovery instructions
│   └── agents.md            # Canonical Agentic Commerce (UCP) guide
│
├── css/                     # 29 Production stylesheets extracted from CDN
│   ├── base.css             # Main Dawn theme core CSS & CSS custom variables
│   ├── component-card.css   # Product & collection cards
│   ├── component-slideshow.css # Homepage hero sliders
│   ├── omega.carousel.css   # Omega Instagram feed extension CSS
│   └── ... (25 additional component stylesheets)
│
├── js/                      # 34 Production JavaScript files
│   ├── global.js            # Core Dawn theme interaction controller
│   ├── animations.js        # Scroll & transition micro-interactions
│   ├── predictive-search.js # Search dropdown & live filter query engine
│   ├── cart-notification.js # Cart slideout & AJAX drawer
│   ├── omega.*.js           # Omega Instagram feed logic & modal viewer
│   └── ... (28 additional scripts)
│
├── assets/
│   ├── fonts/               # 10 Web font files (Instrument Sans & Ovo)
│   ├── icons/               # 578 SVG vector icons extracted from site UI
│   └── images/
│       ├── banners/         # Hero sliders, promotional cards & brand logo
│       ├── collections/     # Category showcase cards (Blouses, Sarees, Kurtis)
│       └── products/        # Featured product imagery
│
├── data/                    # Structured JSON data extracted from APIs
│   ├── products_full_catalog.json # All 1,993 products with variants & prices
│   ├── collections.json     # All 30 active store collections
│   ├── catalog_summary.json # Statistical analytics of catalog & pricing
│   ├── css_design_tokens.json # Complete CSS root variables & design tokens
│   └── ucp_profile.json     # Universal Commerce Protocol profile (MCP)
│
└── scripts/                 # Automated audit & asset download scripts
    ├── inspect_site.js      # Initial metadata & endpoint inspection
    ├── deep_analysis.js     # CSS tokens, trackers & asset categorization
    ├── check_pages.js       # Policy & static page scraper
    ├── inspect_sections.js  # Section layout & navigation mapper
    ├── inspect_banners.js   # Image banner & heading analyzer
    ├── download_all.js      # Complete multi-threaded asset downloader
    └── analyze_catalog.js   # Statistical pricing & taxonomy analyzer
```

---

## ⚡ High-Level Overview

- **Platform:** Shopify Online Store 2.0 (Theme: Dawn 15.3.0)
- **Infrastructure:** Cloudflare CDN (Edge BOM / Mumbai) on Google Cloud Platform (`gcp-asia-southeast1`)
- **Total Products:** 1,993 items across 3,725 variants
- **Price Range:** ₹150 – ₹3,895 (Median: ₹945, Average: ₹1,014)
- **Primary Categories:** Sarees (782), Salwars/Suits (761), Blouses (101), Accessories (95), Nightwear/Maternity (59)
- **Typography:** Ovo (Headings) + Instrument Sans (Body)
- **Branding Palette:** Terracotta (`#A04508`), Espresso (`#572A05`), Amber Gold (`#845401`), Ivory Warm Cream (`#FFFCF0`)

---

## 🚀 Deploying to Vercel (1-Click Zero-Config)

This repository is pre-configured and 100% production-ready for deployment on **[Vercel](https://vercel.com/)**:

1. Log into your [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New"** > **"Project"**.
2. Select your repository: `chiragsatish2011-pixel/vastraabharana`.
3. Vercel automatically detects the root [`vercel.json`](./vercel.json) and [`package.json`](./package.json):
   - **Framework Preset:** Vite
   - **Build Command:** `cd storefront && npm install && npm run build`
   - **Output Directory:** `storefront/dist`
4. Click **Deploy**.
5. Your live high-performance 3D storefront will be live on Vercel Edge with complete SPA routing and instant asset caching.
