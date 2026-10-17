export type CategoryId =
  | 'seo'
  | 'content-marketing'
  | 'blogging'
  | 'technical-seo'
  | 'analytics'
  | 'growth-strategy';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  slug: string;
}

export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ArticleCallout {
  type: 'tip' | 'checklist' | 'framework' | 'takeaway';
  title: string;
  items?: string[];
  content?: string;
}

export interface ArticleSection {
  id: string;
  heading?: string;
  level?: 2 | 3;
  paragraphs: string[];
  callout?: ArticleCallout;
  list?: {
    type: 'bullet' | 'ordered';
    items: { boldText?: string; text: string }[];
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
  quote?: {
    text: string;
    cite?: string;
  };
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  metaDescription: string;
  targetKeyword: string;
  secondaryKeywords: string[];
  category: CategoryId;
  categoryLabel: string;
  readingTime: string;
  publishedAt: string;
  updatedAt?: string;
  author: Author;
  heroImage: string;
  altText: string;
  featured?: boolean;
  popular?: boolean;
  tableOfContents: TableOfContentsItem[];
  intro: string[];
  keyTakeaways: string[];
  sections: ArticleSection[];
  faqs: FAQItem[];
  relatedSlugs: string[];
}

export interface SearchFilterState {
  query: string;
  category: CategoryId | 'all';
  sortBy: 'newest' | 'reading-time' | 'alphabetical';
}
