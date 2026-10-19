import { Article } from '../types/blog';

export interface SEOConfig {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  article?: Article;
  breadcrumbs?: { name: string; path: string }[];
  image?: string;
  noindex?: boolean;
  robots?: string;
}

/**
 * Authoritative production origin for canonical URLs, Open Graph, and Schema.org metadata.
 */
export const PRODUCTION_SITE_ORIGIN = 'https://thegrowthdesk.com';

/**
 * Validates a candidate URL against the authoritative production domain.
 * Rejects Vercel preview URLs (*.vercel.app), localhost, or any unrelated domains.
 */
export const isValidProductionUrl = (urlStr: string): boolean => {
  try {
    const parsed = new URL(urlStr);
    const hostname = parsed.hostname.toLowerCase();
    return hostname === 'thegrowthdesk.com' || hostname === 'www.thegrowthdesk.com';
  } catch {
    return false;
  }
};

/**
 * Returns the authoritative production site URL.
 *
 * Explicitly removes the unsafe fallback to window.location.origin, ensuring that
 * Vercel preview environments, local dev hosts, or staging deployments never emit
 * self-referential preview canonical URLs that could poison search engine indexes.
 */
export const getSiteUrl = (): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL) {
    const candidate = (import.meta.env.VITE_SITE_URL as string).trim().replace(/\/+$/, '');
    if (isValidProductionUrl(candidate)) {
      return PRODUCTION_SITE_ORIGIN;
    }
  }

  // Always return the authoritative production origin
  return PRODUCTION_SITE_ORIGIN;
};

/**
 * Generates an authoritative canonical URL for a given route path.
 * Returns empty string if no canonicalPath is specified (e.g., 404 page).
 */
export const buildCanonicalUrl = (canonicalPath?: string): string => {
  if (!canonicalPath) return '';
  const siteUrl = getSiteUrl();
  const trimmed = canonicalPath.trim();
  const normalized = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  if (normalized === '/') {
    return `${siteUrl}/`;
  }
  const withTrailingSlash = normalized.endsWith('/') ? normalized : `${normalized}/`;
  return `${siteUrl}${withTrailingSlash}`;
};

export const updatePageSEO = (config: SEOConfig) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const siteUrl = getSiteUrl();
  const fullTitle = config.title.includes('The Growth Desk')
    ? config.title
    : `${config.title} — The Growth Desk`;

  // 1. Title
  document.title = fullTitle;

  // 2. Meta description (prevent duplicate tags)
  const descMetas = document.querySelectorAll('meta[name="description"]');
  let descMeta: HTMLMetaElement;
  if (descMetas.length > 0) {
    descMeta = descMetas[0] as HTMLMetaElement;
    for (let i = 1; i < descMetas.length; i++) {
      descMetas[i].remove();
    }
  } else {
    descMeta = document.createElement('meta');
    descMeta.setAttribute('name', 'description');
    document.head.appendChild(descMeta);
  }
  descMeta.setAttribute('content', config.description);

  // 3. Robots meta directive (prevent duplicate tags; support noindex and restore on valid pages)
  const robotsMetas = document.querySelectorAll('meta[name="robots"]');
  let robotsMeta: HTMLMetaElement;
  if (robotsMetas.length > 0) {
    robotsMeta = robotsMetas[0] as HTMLMetaElement;
    for (let i = 1; i < robotsMetas.length; i++) {
      robotsMetas[i].remove();
    }
  } else {
    robotsMeta = document.createElement('meta');
    robotsMeta.setAttribute('name', 'robots');
    document.head.appendChild(robotsMeta);
  }

  const defaultRobots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const robotsContent = config.robots || (config.noindex ? 'noindex, follow' : defaultRobots);
  robotsMeta.setAttribute('content', robotsContent);

  // 4. Canonical link (prevent duplicate tags; remove on 404 so /404 is never declared canonical)
  const canonicalLinks = document.querySelectorAll('link[rel="canonical"]');
  const canonicalUrl = buildCanonicalUrl(config.canonicalPath);

  if (canonicalUrl) {
    let canonicalLink: HTMLLinkElement;
    if (canonicalLinks.length > 0) {
      canonicalLink = canonicalLinks[0] as HTMLLinkElement;
      for (let i = 1; i < canonicalLinks.length; i++) {
        canonicalLinks[i].remove();
      }
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('id', 'canonical-tag');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);
  } else {
    // A 404 or missing page must never declare a canonical URL
    canonicalLinks.forEach((link) => link.remove());
  }

  // 5. OpenGraph Tags (prevent duplicate tags)
  const setMeta = (attr: 'name' | 'property', key: string, value: string) => {
    const elements = document.querySelectorAll(`meta[${attr}="${key}"]`);
    let el: HTMLMetaElement;
    if (elements.length > 0) {
      el = elements[0] as HTMLMetaElement;
      for (let i = 1; i < elements.length; i++) {
        elements[i].remove();
      }
    } else {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', value);
  };

  setMeta('property', 'og:title', fullTitle);
  setMeta('property', 'og:description', config.description);
  if (canonicalUrl) {
    setMeta('property', 'og:url', canonicalUrl);
  } else {
    const ogUrls = document.querySelectorAll('meta[property="og:url"]');
    ogUrls.forEach((el) => el.remove());
  }
  setMeta('property', 'og:type', config.ogType || 'website');
  setMeta('property', 'og:site_name', 'The Growth Desk');

  // Twitter Tags
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', fullTitle);
  setMeta('name', 'twitter:description', config.description);

  // Dynamic OpenGraph and Twitter Image
  const rawImage = config.article?.heroImage || config.image || '/images/hero-growth-desk.webp';
  const fullImageUrl = rawImage.startsWith('http') ? rawImage : `${siteUrl}${rawImage}`;
  setMeta('property', 'og:image', fullImageUrl);
  setMeta('name', 'twitter:image', fullImageUrl);

  // 6. JSON-LD Dynamic Injection
  updateJsonLd(config, siteUrl, canonicalUrl);
};

const MONTH_MAP: Record<string, string> = {
  january: '01',
  february: '02',
  march: '03',
  april: '04',
  may: '05',
  june: '06',
  july: '07',
  august: '08',
  september: '09',
  october: '10',
  november: '11',
  december: '12',
};

/**
 * Validates and converts an article date string (e.g., "October 15, 2026")
 * into a valid ISO 8601 / RFC 3339 timestamp string.
 * Returns null if missing or invalid, ensuring we never invent dates.
 */
export const formatIsoDate = (dateStr?: string): string | null => {
  if (!dateStr || typeof dateStr !== 'string') return null;

  const trimmed = dateStr.trim();
  // Check if already in ISO 8601 format
  const isoMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2}))?$/);
  if (isoMatch) {
    return trimmed.includes('T') ? trimmed : `${trimmed}T00:00:00+00:00`;
  }

  // Parse "Month DD, YYYY" or "Month D, YYYY"
  const textMatch = trimmed.match(/^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/);
  if (textMatch) {
    const month = MONTH_MAP[textMatch[1].toLowerCase()];
    const day = textMatch[2].padStart(2, '0');
    const year = textMatch[3];
    if (month) {
      return `${year}-${month}-${day}T00:00:00+00:00`;
    }
  }

  // Fallback parser if valid
  const parsed = new Date(trimmed);
  if (!isNaN(parsed.getTime())) {
    const y = parsed.getUTCFullYear();
    const m = String(parsed.getUTCMonth() + 1).padStart(2, '0');
    const d = String(parsed.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${d}T00:00:00+00:00`;
  }

  return null;
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

    // Convert actual article dates into ISO 8601 / RFC 3339 timestamps
    const datePublished = formatIsoDate(art.publishedAt);
    const dateModified = formatIsoDate(art.updatedAt) || datePublished;

    const blogPosting: Record<string, any> = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl,
      },
      headline: art.title,
      description: art.metaDescription,
      image: [imageUrl],
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

    if (datePublished) {
      blogPosting.datePublished = datePublished;
    }
    if (dateModified) {
      blogPosting.dateModified = dateModified;
    }

    scripts.push(blogPosting);

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
