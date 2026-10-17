import { Article } from '../types/blog';

export interface SEOConfig {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  article?: Article;
  breadcrumbs?: { name: string; path: string }[];
}

export const getSiteUrl = (): string => {
  if (typeof window !== 'undefined') {
    // If environment variable is set for production
    if (import.meta.env.VITE_SITE_URL) {
      return (import.meta.env.VITE_SITE_URL as string).replace(/\/$/, '');
    }
    // AI Studio Dev URL or local origin
    return window.location.origin;
  }
  return 'https://thegrowthdesk.com';
};

export const updatePageSEO = (config: SEOConfig) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const siteUrl = getSiteUrl();
  const fullTitle = config.title.includes('The Growth Desk')
    ? config.title
    : `${config.title} — The Growth Desk`;

  // 1. Title
  document.title = fullTitle;

  // 2. Meta description
  let descMeta = document.querySelector('meta[name="description"]');
  if (!descMeta) {
    descMeta = document.createElement('meta');
    descMeta.setAttribute('name', 'description');
    document.head.appendChild(descMeta);
  }
  descMeta.setAttribute('content', config.description);

  // 3. Canonical link
  const canonicalUrl = config.canonicalPath
    ? `${siteUrl}${config.canonicalPath.startsWith('/') ? '' : '/'}${config.canonicalPath}`
    : `${siteUrl}${window.location.pathname}`;

  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);

  // 4. OpenGraph Tags
  const setMeta = (attr: 'name' | 'property', key: string, value: string) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', value);
  };

  setMeta('property', 'og:title', fullTitle);
  setMeta('property', 'og:description', config.description);
  setMeta('property', 'og:url', canonicalUrl);
  setMeta('property', 'og:type', config.ogType || 'website');
  setMeta('property', 'og:site_name', 'The Growth Desk');

  // Twitter Tags
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', fullTitle);
  setMeta('name', 'twitter:description', config.description);

  if (config.article?.heroImage) {
    const imageUrl = config.article.heroImage.startsWith('http')
      ? config.article.heroImage
      : `${siteUrl}${config.article.heroImage}`;
    setMeta('property', 'og:image', imageUrl);
    setMeta('name', 'twitter:image', imageUrl);
  }

  // 5. JSON-LD Dynamic Injection
  updateJsonLd(config, siteUrl, canonicalUrl);
};

const updateJsonLd = (config: SEOConfig, siteUrl: string, canonicalUrl: string) => {
  // Remove prior page-specific schema
  const existingDynamicSchema = document.getElementById('page-dynamic-schema');
  if (existingDynamicSchema) {
    existingDynamicSchema.remove();
  }

  const scripts: object[] = [];

  // Breadcrumbs Schema
  if (config.breadcrumbs && config.breadcrumbs.length > 0) {
    scripts.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: config.breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${siteUrl}${item.path}`,
      })),
    });
  }

  // BlogPosting Schema if article
  if (config.article) {
    const art = config.article;
    const imageUrl = art.heroImage.startsWith('http') ? art.heroImage : `${siteUrl}${art.heroImage}`;

    scripts.push({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl,
      },
      headline: art.title,
      description: art.metaDescription,
      image: [imageUrl],
      datePublished: '2026-10-15T00:00:00+00:00', // RFC 3339 format
      dateModified: art.updatedAt ? '2026-10-16T00:00:00+00:00' : '2026-10-15T00:00:00+00:00',
      author: {
        '@type': 'Person',
        name: art.author.name,
        jobTitle: art.author.role,
      },
      publisher: {
        '@type': 'Organization',
        name: 'The Growth Desk',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/logo.png`,
        },
      },
      keywords: [art.targetKeyword, ...art.secondaryKeywords].join(', '),
      articleSection: art.categoryLabel,
    });

    // If there are FAQs in the article, add FAQPage schema as well for rich snippets!
    if (art.faqs && art.faqs.length > 0) {
      scripts.push({
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

  if (scripts.length > 0) {
    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.id = 'page-dynamic-schema';
    scriptTag.text = JSON.stringify(scripts.length === 1 ? scripts[0] : scripts);
    document.head.appendChild(scriptTag);
  }
};
