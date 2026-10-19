import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import { ARTICLES } from '../src/data/articles';
import { buildCanonicalUrl, formatIsoDate, PRODUCTION_SITE_ORIGIN } from '../src/utils/seo';

interface RouteSEO {
  path: string;
  outputPath: string;
  title: string;
  description: string;
  canonicalUrl?: string;
  ogType: 'website' | 'article';
  ogImage: string;
  noindex?: boolean;
  breadcrumbs?: { name: string; path: string }[];
  article?: (typeof ARTICLES)[0];
}

const siteUrl = PRODUCTION_SITE_ORIGIN;

const routes: RouteSEO[] = [
  // Core Static Pages
  {
    path: '/',
    outputPath: 'index.html',
    title: 'The Growth Desk — SEO, Content & Digital Marketing Guides',
    description:
      'Practical, in-depth guides on SEO, content strategy, and website optimization to help creators, bloggers, and founders grow compounding organic search traffic.',
    canonicalUrl: buildCanonicalUrl('/'),
    ogType: 'website',
    ogImage: `${siteUrl}/images/hero-growth-desk.webp`,
  },
  {
    path: '/blog/',
    outputPath: 'blog/index.html',
    title: 'All Guides & Editorial Articles — The Growth Desk',
    description:
      'Explore our complete library of actionable search engine optimization, content marketing, on-page optimization, and technical SEO guides.',
    canonicalUrl: buildCanonicalUrl('/blog/'),
    ogType: 'website',
    ogImage: `${siteUrl}/images/hero-growth-desk.webp`,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Articles', path: '/blog/' },
    ],
  },
  {
    path: '/about/',
    outputPath: 'about/index.html',
    title: 'About The Growth Desk — Our Editorial Mission & Standards',
    description:
      'Learn about The Growth Desk, our editorial standards, our focus on technical SEO and content strategy, and our commitment to tested growth frameworks.',
    canonicalUrl: buildCanonicalUrl('/about/'),
    ogType: 'website',
    ogImage: `${siteUrl}/images/hero-growth-desk.webp`,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about/' },
    ],
  },
  {
    path: '/contact/',
    outputPath: 'contact/index.html',
    title: 'Contact the Editorial Team — The Growth Desk',
    description:
      'Get in touch with The Growth Desk editorial team for editorial inquiries, topic suggestions, technical corrections, feedback, and partnership opportunities.',
    canonicalUrl: buildCanonicalUrl('/contact/'),
    ogType: 'website',
    ogImage: `${siteUrl}/images/hero-growth-desk.webp`,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact/' },
    ],
  },
  {
    path: '/privacy-policy/',
    outputPath: 'privacy-policy/index.html',
    title: 'Privacy Policy & Data Protection — The Growth Desk',
    description:
      'Read the privacy policy for The Growth Desk. Learn what data we collect, how we respect reader privacy, cookie disclosures, and data protection practices.',
    canonicalUrl: buildCanonicalUrl('/privacy-policy/'),
    ogType: 'website',
    ogImage: `${siteUrl}/images/hero-growth-desk.webp`,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Privacy Policy', path: '/privacy-policy/' },
    ],
  },
  {
    path: '/disclaimer/',
    outputPath: 'disclaimer/index.html',
    title: 'Editorial & Affiliate Disclaimer — The Growth Desk',
    description:
      'Read The Growth Desk editorial and affiliate disclaimer. Disclosures regarding our educational purpose, affiliate partnerships, and testing methodologies.',
    canonicalUrl: buildCanonicalUrl('/disclaimer/'),
    ogType: 'website',
    ogImage: `${siteUrl}/images/hero-growth-desk.webp`,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Disclaimer', path: '/disclaimer/' },
    ],
  },
  // 404 Route
  {
    path: '/404',
    outputPath: '404.html',
    title: 'Page Not Found (404) — The Growth Desk',
    description:
      'The requested page or guide could not be located. Explore our core search engine optimization, content marketing, and technical SEO guides from the homepage.',
    ogType: 'website',
    ogImage: `${siteUrl}/images/hero-growth-desk.webp`,
    noindex: true,
  },
];

// Add all 10 Articles
for (const art of ARTICLES) {
  const articleCanonical = buildCanonicalUrl(`/blog/${art.slug}/`);
  const imageUrl = art.heroImage.startsWith('http')
    ? art.heroImage
    : `${siteUrl}${art.heroImage}`;

  routes.push({
    path: `/blog/${art.slug}/`,
    outputPath: `blog/${art.slug}/index.html`,
    title: `${art.title} — The Growth Desk`,
    description: art.metaDescription,
    canonicalUrl: articleCanonical,
    ogType: 'article',
    ogImage: imageUrl,
    article: art,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Articles', path: '/blog/' },
      { name: art.title, path: `/blog/${art.slug}/` },
    ],
  });
}

function generateSchemaJsonLd(route: RouteSEO): string {
  const schemas: object[] = [];

  // Breadcrumbs Schema
  if (route.breadcrumbs && route.breadcrumbs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: route.breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${siteUrl}${item.path}`,
      })),
    });
  }

  // BlogPosting Schema if article
  if (route.article) {
    const art = route.article;
    const datePublished = formatIsoDate(art.publishedAt);
    const dateModified = formatIsoDate(art.updatedAt) || datePublished;

    const blogPosting: Record<string, any> = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': route.canonicalUrl,
      },
      headline: art.title,
      description: art.metaDescription,
      image: [route.ogImage],
      author: {
        '@type': 'Person',
        name: art.author.name,
        jobTitle: art.author.role,
      },
      publisher: {
        '@type': 'Organization',
        name: 'The Growth Desk',
        url: `${siteUrl}/`,
      },
      keywords: [art.targetKeyword, ...art.secondaryKeywords].join(', '),
      articleSection: art.categoryLabel,
    };

    if (datePublished) blogPosting.datePublished = datePublished;
    if (dateModified) blogPosting.dateModified = dateModified;

    schemas.push(blogPosting);

    // FAQPage schema if faqs exist
    if (art.faqs && art.faqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: art.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      });
    }
  }

  if (schemas.length === 0) return '';
  return `<script type="application/ld+json" id="page-dynamic-schema">${JSON.stringify(
    schemas.length === 1 ? schemas[0] : schemas
  )}</script>`;
}

async function runPrerender() {
  const distDir = path.resolve('dist');
  const templatePath = path.join(distDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.error('Template dist/index.html not found! Run vite build first.');
    process.exit(1);
  }

  const templateHtml = fs.readFileSync(templatePath, 'utf8');

  console.log(`\n=== PRERENDERING ${routes.length} ROUTES ===`);

  for (const route of routes) {
    // 1. Render App HTML for this route
    const appHtml = renderToString(React.createElement(App as React.FC<{ initialPath?: string }>, { initialPath: route.path }));

    // 2. Build metadata replacements
    let pageHtml = templateHtml;

    // Replace root content
    pageHtml = pageHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );

    // Replace title
    pageHtml = pageHtml.replace(
      /<title>.*?<\/title>/,
      `<title>${route.title}</title>`
    );

    // Replace meta description
    pageHtml = pageHtml.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/,
      `<meta name="description" content="${route.description.replace(/"/g, '&quot;')}" />`
    );

    // Replace robots directive
    const robotsDirective = route.noindex
      ? 'noindex, follow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    pageHtml = pageHtml.replace(
      /<meta\s+name="robots"\s+content=".*?"\s*\/?>/,
      `<meta name="robots" content="${robotsDirective}" />`
    );

    // Canonical link handling
    if (route.canonicalUrl) {
      pageHtml = pageHtml.replace(
        /<link\s+rel="canonical"\s+id="canonical-tag"\s+href=".*?"\s*\/?>/,
        `<link rel="canonical" id="canonical-tag" href="${route.canonicalUrl}" />`
      );
    } else {
      // Remove canonical tag on 404
      pageHtml = pageHtml.replace(
        /\s*<link\s+rel="canonical"\s+id="canonical-tag"\s+href=".*?"\s*\/?>/,
        ''
      );
    }

    // Open Graph Tags
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/,
      `<meta property="og:title" content="${route.title.replace(/"/g, '&quot;')}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/,
      `<meta property="og:description" content="${route.description.replace(/"/g, '&quot;')}" />`
    );
    if (route.canonicalUrl) {
      pageHtml = pageHtml.replace(
        /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/,
        `<meta property="og:url" content="${route.canonicalUrl}" />`
      );
    } else {
      pageHtml = pageHtml.replace(
        /\s*<meta\s+property="og:url"\s+content=".*?"\s*\/?>/,
        ''
      );
    }
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:type"\s+content=".*?"\s*\/?>/,
      `<meta property="og:type" content="${route.ogType}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:image"\s+content=".*?"\s*\/?>/,
      `<meta property="og:image" content="${route.ogImage}" />`
    );

    // Twitter Tags
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/,
      `<meta name="twitter:title" content="${route.title.replace(/"/g, '&quot;')}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/,
      `<meta name="twitter:description" content="${route.description.replace(/"/g, '&quot;')}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/,
      `<meta name="twitter:image" content="${route.ogImage}" />`
    );

    // Dynamic Schema.org injection
    const dynamicSchemaTag = generateSchemaJsonLd(route);
    if (dynamicSchemaTag) {
      pageHtml = pageHtml.replace('</head>', `  ${dynamicSchemaTag}\n  </head>`);
    }

    // Write output file
    const targetFilePath = path.join(distDir, route.outputPath);
    const targetDir = path.dirname(targetFilePath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.writeFileSync(targetFilePath, pageHtml, 'utf8');
    console.log(`✓ Prerendered ${route.path.padEnd(35)} -> dist/${route.outputPath}`);
  }

  console.log(`\nSuccessfully prerendered all ${routes.length} routes into dist/!`);
}

runPrerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
