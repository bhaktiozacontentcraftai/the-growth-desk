# The Growth Desk — Production-Ready SEO Blog

A modern, editorial-style, production-ready blog website built for digital marketing, search engine optimization (SEO), content strategy, and online business growth.

Engineered with React 19, TypeScript, Vite, and Tailwind CSS, featuring 10 complete in-depth articles, dynamic JSON-LD structured data, clean URL architecture, automated XML sitemaps, robots.txt directives, and zero-configuration Vercel deployment.

---

## 🚀 Quick Start Guide

### 1. Local Development

```bash
# Install dependencies
npm install

# Start local development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build
```

---

## 📦 How to Connect to GitHub and Deploy to Vercel

Follow these exact steps to push this project to your GitHub account and launch it with automated continuous deployments on Vercel:

### Step 1: Initialize Git and Commit Your Code
In your project root terminal, run:

```bash
git init
git add .
git commit -m "feat: complete SEO-optimized blog website for The Growth Desk"
```

### Step 2: Push to Your Existing GitHub Repository
Link your local repository to your GitHub repository and push to the `main` branch:

```bash
git branch -M main
git remote add origin https://github.com/bhaktiozacontentcraftai/the-growth-desk.git
git push -u origin main
```

### Step 3: Import into Vercel
1. Visit [vercel.com](https://vercel.com) and log in.
2. Click **Add New... > Project**.
3. Select your newly created `the-growth-desk` GitHub repository.
4. Vercel will auto-detect **Vite**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Vercel will build and assign an active `.vercel.app` production URL.

### Step 4: Configure Production Canonical Base URL
To ensure canonical tags, OpenGraph social cards, and sitemaps use your custom domain rather than the temporary preview URL:
1. In your Vercel Dashboard, navigate to **Project Settings > Environment Variables**.
2. Add a new variable:
   - **Name**: `VITE_SITE_URL`
   - **Value**: `https://your-custom-domain.com` (or your `https://the-growth-desk.vercel.app` domain)
3. Under **Project Settings > Domains**, connect your custom domain (e.g. `thegrowthdesk.com`) by following the standard CNAME or A record DNS instructions.
4. Trigger a **Redeploy** to apply the environment variable.

---

## 🔍 Key SEO Features

- **Strict URL Hierarchy**: Clean, lowercase, trailing-slash normalized routes:
  - `/` (Home)
  - `/blog/` (Blog listing with live search & category filters)
  - `/blog/seo-for-beginners/`
  - `/blog/keyword-research-guide/`
  - `/blog/on-page-seo-checklist/`
  - `/blog/technical-seo-guide/`
  - `/blog/seo-friendly-blog-writing/`
  - `/blog/content-marketing-strategy/`
  - `/blog/internal-linking-best-practices/`
  - `/blog/website-speed-core-web-vitals/`
  - `/blog/blogging-for-beginners/`
  - `/blog/measure-seo-performance/`
  - `/about/`
  - `/contact/`
  - `/privacy-policy/`
  - `/disclaimer/`
- **Dynamic SEO Head Tags**: Every page automatically syncs `<title>`, `<meta name="description">`, `<link rel="canonical">`, and OpenGraph/Twitter cards.
- **Valid Schema.org JSON-LD**:
  - `WebSite` & `Organization` on homepage.
  - `BlogPosting` with headline, author, publication date, and featured image on articles.
  - `BreadcrumbList` on all hierarchical views.
  - `FAQPage` schema on articles containing interactive FAQ sections.
- **Pre-configured Crawl Files**:
  - `/public/sitemap.xml`: Complete XML sitemap listing all 10 articles and core pages.
  - `/public/robots.txt`: Production crawlers allowed with explicit reference to `sitemap.xml`.
- **Zero-Pill Design Discipline**: Clean typographic metadata separation (`·`) and high-contrast editorial hierarchy following modern design standards.
- **Vercel Routing**: Included `/vercel.json` ensures all direct URL refreshes rewrite gracefully to `index.html` with immutable asset caching.

---

## 🛠️ Project Structure

```
├── public/
│   ├── robots.txt            # Search crawler directives
│   └── sitemap.xml           # XML sitemap with canonical URLs
├── src/
│   ├── assets/images/        # High-fidelity editorial photographs
│   ├── components/           # Reusable UI components
│   │   ├── ArticleCard.tsx   # Card with unboxed metadata discipline
│   │   ├── Breadcrumbs.tsx   # Semantic breadcrumb trail
│   │   ├── DeploymentModal.tsx # In-app GitHub/Vercel guide
│   │   ├── Footer.tsx        # Editorial footer
│   │   ├── Header.tsx        # Top Bar Contract header
│   │   ├── NewsletterBox.tsx # Newsletter component with validation
│   │   ├── ShareButtons.tsx  # Social sharing & copy link
│   │   └── TableOfContents.tsx # Interactive heading tracker
│   ├── data/
│   │   ├── articles.ts       # Exactly 10 complete in-depth articles
│   │   └── categories.ts     # Growth disciplines & taxonomy
│   ├── pages/                # Page route views
│   ├── types/blog.ts         # TypeScript interfaces
│   ├── utils/
│   │   ├── router.tsx        # History API client router
│   │   └── seo.ts            # Dynamic document head & JSON-LD manager
│   ├── App.tsx               # Main application routing
│   ├── index.css             # Tailwind v4 theme & typography
│   └── main.tsx              # React DOM entry point
├── vercel.json               # Vercel rewrites & HTTP headers
└── package.json
```

---

## 📄 License
This project is open-source under the [Apache 2.0 License](LICENSE).
