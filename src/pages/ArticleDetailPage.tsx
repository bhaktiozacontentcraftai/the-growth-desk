import React, { useEffect, useState } from 'react';
import { Article } from '../types/blog';
import { ARTICLES } from '../data/articles';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { TableOfContents } from '../components/TableOfContents';
import { ShareButtons } from '../components/ShareButtons';
import { ArticleCard } from '../components/ArticleCard';
import { NewsletterBox } from '../components/NewsletterBox';
import { Link } from '../utils/router';
import { updatePageSEO, getSiteUrl } from '../utils/seo';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  Check,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';

interface ArticleDetailPageProps {
  slug: string;
}

const renderContentWithLinks = (text: string): React.ReactNode => {
  if (!text || typeof text !== 'string') return text;
  if (!text.includes('[') || !text.includes('](')) return text;

  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const elements: React.ReactNode[] = [];
  let lastIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      elements.push(text.slice(lastIdx, match.index));
    }
    const label = match[1];
    const href = match[2];
    elements.push(
      <Link
        key={`${href}-${match.index}`}
        href={href}
        className="font-medium text-stone-900 underline decoration-stone-400 underline-offset-3 hover:text-stone-950 hover:decoration-stone-900 transition-colors"
      >
        {label}
      </Link>
    );
    lastIdx = match.index + match[0].length;
  }

  if (lastIdx < text.length) {
    elements.push(text.slice(lastIdx));
  }

  return elements;
};

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ slug }) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [imageError, setImageError] = useState(false);

  const article = ARTICLES.find((a) => a.slug === slug);
  const currentIndex = ARTICLES.findIndex((a) => a.slug === slug);
  const prevArticle = currentIndex > 0 ? ARTICLES[currentIndex - 1] : null;
  const nextArticle = currentIndex < ARTICLES.length - 1 ? ARTICLES[currentIndex + 1] : null;

  // Resolve related articles
  const relatedArticles = article?.relatedSlugs
    ? ARTICLES.filter((a) => article.relatedSlugs.includes(a.slug)).slice(0, 3)
    : ARTICLES.filter((a) => a.slug !== slug).slice(0, 3);

  // Update SEO and reading progress
  useEffect(() => {
    if (!article) return;

    const canonicalPath = `/blog/${article.slug}/`;

    updatePageSEO({
      title: article.title,
      description: article.metaDescription,
      canonicalPath,
      ogType: 'article',
      article,
      breadcrumbs: [
        { name: 'Articles', path: '/blog/' },
        { name: article.title, path: canonicalPath },
      ],
    });

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setReadingProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article]);

  if (!article) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif text-3xl font-bold text-stone-900">Article Not Found</h1>
        <p className="text-sm text-stone-600">
          The requested guide does not exist or may have been relocated.
        </p>
        <Link
          href="/blog/"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Articles Index</span>
        </Link>
      </div>
    );
  }

  const siteUrl = getSiteUrl();
  const currentFullUrl = `${siteUrl}/blog/${article.slug}/`;

  return (
    <div>
      {/* Top Reading Progress Bar */}
      <div
        id="reading-progress-bar"
        className="fixed top-0 left-0 right-0 h-1 bg-stone-900 z-50 transition-all duration-75"
        style={{ width: `${readingProgress}%` }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { name: 'Articles', path: '/blog/' },
            { name: article.categoryLabel, path: `/blog/?category=${article.category}` },
            { name: article.title, path: `/blog/${article.slug}/` },
          ]}
        />

        {/* Article Header */}
        <header className="max-w-3xl space-y-5">
          {/* Zero-pill unboxed metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 font-medium">
            <Link
              href={`/blog/?category=${article.category}`}
              className="text-stone-900 font-semibold hover:underline"
            >
              {article.categoryLabel}
            </Link>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 opacity-70" />
              <span>Published {article.publishedAt}</span>
            </span>
            {article.updatedAt && (
              <>
                <span aria-hidden="true" className="text-stone-400">·</span>
                <span className="text-stone-500">Updated {article.updatedAt}</span>
              </>
            )}
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 opacity-70" />
              <span>{article.readingTime}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-sans">
            {article.subtitle}
          </p>

          {/* Author Byline & Social Share */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-stone-900 text-stone-100 flex items-center justify-center font-semibold text-xs font-mono">
                {article.author.avatar}
              </div>
              <div className="text-xs">
                <p className="font-semibold text-stone-900">{article.author.name}</p>
                <p className="text-stone-500">{article.author.role}</p>
              </div>
            </div>

            <ShareButtons title={article.title} url={currentFullUrl} />
          </div>
        </header>

        {/* Hero Visual Asset */}
        <figure className="max-w-4xl space-y-2">
          <div className="aspect-16/9 w-full overflow-hidden rounded-xl bg-stone-100 border border-stone-200/90 relative">
            {!imageError ? (
              <img
                src={article.heroImage}
                alt={article.altText}
                width={1200}
                height={675}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-stone-100 text-stone-400">
                <BookOpen className="w-12 h-12 mb-3 opacity-40" />
                <p className="text-xs text-stone-500 font-medium">{article.title}</p>
              </div>
            )}
          </div>
          <figcaption className="text-[11px] text-stone-500 italic text-right px-1 flex items-center justify-between">
            <span className="not-italic uppercase font-mono text-[10px] text-stone-400">Featured Visual</span>
            <span>{article.imageDescription || article.altText}</span>
          </figcaption>
        </figure>

        {/* Main Content Layout with Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Article Body Column */}
          <main className="lg:col-span-8 space-y-8">
            {/* Introductory Section */}
            <section className="space-y-4 text-stone-800 text-base leading-relaxed">
              {article.intro.map((paragraph, index) => (
                <p
                  key={index}
                  className={index === 0 ? 'editorial-dropcap text-base sm:text-lg leading-relaxed' : 'text-base leading-relaxed'}
                >
                  {renderContentWithLinks(paragraph)}
                </p>
              ))}
            </section>

            {/* Key Takeaways Box */}
            <aside
              aria-label="Key Takeaways"
              className="bg-stone-100/90 border border-stone-200/90 rounded-xl p-6 space-y-3"
            >
              <h2 className="text-xs uppercase tracking-wider font-semibold text-stone-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-stone-800" />
                <span>Executive Summary & Key Takeaways</span>
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-700 leading-relaxed">
                {article.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-900 mt-2 shrink-0" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </aside>

            {/* Mobile TOC Drawer */}
            <div className="lg:hidden">
              <TableOfContents items={article.tableOfContents} />
            </div>

            {/* In-Depth Content Sections */}
            <article className="space-y-12">
              {article.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4">
                  {section.heading && (
                    section.level === 3 ? (
                      <h3 className="font-serif font-bold text-stone-900 tracking-tight text-xl sm:text-2xl pt-2">
                        {section.heading}
                      </h3>
                    ) : (
                      <h2 className="font-serif font-bold text-stone-900 tracking-tight text-2xl sm:text-3xl border-b border-stone-200 pb-2">
                        {section.heading}
                      </h2>
                    )
                  )}

                  {section.paragraphs.map((para, pIdx) => (
                    <p key={pIdx} className="text-stone-800 text-sm sm:text-base leading-relaxed">
                      {renderContentWithLinks(para)}
                    </p>
                  ))}

                  {/* In-Article Contextual Figure / Diagram */}
                  {section.image && (
                    <figure className="my-6 rounded-xl overflow-hidden border border-stone-200/90 bg-stone-50/60 shadow-xs">
                      <div className="w-full overflow-hidden bg-stone-100 aspect-16/9">
                        <img
                          src={section.image.src}
                          alt={section.image.alt}
                          width={1200}
                          height={675}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      {section.image.caption && (
                        <figcaption className="px-4 py-2.5 text-xs text-stone-600 italic bg-stone-100/70 border-t border-stone-200/60 flex items-center justify-between">
                          <span>{section.image.caption}</span>
                          <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 not-italic">Figure</span>
                        </figcaption>
                      )}
                    </figure>
                  )}

                  {/* Callout box if present */}
                  {section.callout && (
                    <div className="bg-white border border-stone-200 rounded-xl p-5 my-4 space-y-2 shadow-2xs">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                        {section.callout.title}
                      </h4>
                      {section.callout.content && (
                        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                          {renderContentWithLinks(section.callout.content)}
                        </p>
                      )}
                      {section.callout.items && (
                        <ul className="space-y-1.5 text-xs text-stone-700 pt-1">
                          {section.callout.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-stone-800 shrink-0 mt-0.5" />
                              <span>{renderContentWithLinks(item)}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {/* Structured list if present */}
                  {section.list && (
                    <div className="my-4 pl-2">
                      {section.list.type === 'ordered' ? (
                        <ol className="list-decimal list-inside space-y-2.5 text-xs sm:text-sm text-stone-800 leading-relaxed">
                          {section.list.items.map((li, lIdx) => (
                            <li key={lIdx}>
                              {li.boldText && <strong className="font-semibold text-stone-950">{li.boldText}</strong>}
                              <span>{renderContentWithLinks(li.text)}</span>
                            </li>
                          ))}
                        </ol>
                      ) : (
                        <ul className="space-y-2 text-xs sm:text-sm text-stone-800 leading-relaxed">
                          {section.list.items.map((li, lIdx) => (
                            <li key={lIdx} className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-stone-700 mt-2 shrink-0" />
                              <div>
                                {li.boldText && <strong className="font-semibold text-stone-950">{li.boldText}</strong>}
                                <span>{renderContentWithLinks(li.text)}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {/* Data Table if present */}
                  {section.table && (
                    <div className="overflow-x-auto my-6 border border-stone-200 rounded-lg">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-stone-100/90 text-stone-900 border-b border-stone-200">
                          <tr>
                            {section.table.headers.map((h, hIdx) => (
                              <th key={hIdx} className="px-4 py-3 font-semibold text-xs tracking-wide">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-200 bg-white text-stone-700">
                          {section.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-stone-50">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="px-4 py-3 align-top leading-relaxed">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Contextual internal link banner within body where applicable */}
                  {section.id === 'step-2-find-target-keywords' && (
                    <div className="p-4 bg-stone-100 rounded-lg border border-stone-200 text-xs text-stone-700 flex items-center justify-between gap-4 my-4">
                      <span>Related guide: Learn how to conduct comprehensive keyword research.</span>
                      <Link
                        href="/blog/keyword-research-guide/"
                        className="font-semibold text-stone-900 hover:underline shrink-0"
                      >
                        Read Guide →
                      </Link>
                    </div>
                  )}
                  {section.id === 'step-3-publish-search-optimized-content' && (
                    <div className="p-4 bg-stone-100 rounded-lg border border-stone-200 text-xs text-stone-700 flex items-center justify-between gap-4 my-4">
                      <span>Related checklist: Review our on-page SEO checklist before publishing.</span>
                      <Link
                        href="/blog/on-page-seo-checklist/"
                        className="font-semibold text-stone-900 hover:underline shrink-0"
                      >
                        Review Checklist →
                      </Link>
                    </div>
                  )}
                  {section.id === 'step-4-ensure-technical-health' && (
                    <div className="p-4 bg-stone-100 rounded-lg border border-stone-200 text-xs text-stone-700 flex items-center justify-between gap-4 my-4">
                      <span>Related guide: Deep dive into technical SEO crawlability and sitemaps.</span>
                      <Link
                        href="/blog/technical-seo-guide/"
                        className="font-semibold text-stone-900 hover:underline shrink-0"
                      >
                        Explore Technical SEO →
                      </Link>
                    </div>
                  )}
                  {section.id === 'internal-links-and-readability' && (
                    <div className="p-4 bg-stone-100 rounded-lg border border-stone-200 text-xs text-stone-700 flex items-center justify-between gap-4 my-4">
                      <span>Related guide: Master internal linking best practices to distribute PageRank.</span>
                      <Link
                        href="/blog/internal-linking-best-practices/"
                        className="font-semibold text-stone-900 hover:underline shrink-0"
                      >
                        Internal Linking Guide →
                      </Link>
                    </div>
                  )}
                  {section.id === 'measuring-business-impact' && (
                    <div className="p-4 bg-stone-100 rounded-lg border border-stone-200 text-xs text-stone-700 flex items-center justify-between gap-4 my-4">
                      <span>Related guide: How to measure SEO performance using Google Search Console and Analytics.</span>
                      <Link
                        href="/blog/measure-seo-performance/"
                        className="font-semibold text-stone-900 hover:underline shrink-0"
                      >
                        Measurement Tutorial →
                      </Link>
                    </div>
                  )}
                </section>
              ))}
            </article>

            {/* Frequently Asked Questions Section */}
            {article.faqs && article.faqs.length > 0 && (
              <section id="frequently-asked-questions" className="scroll-mt-24 pt-8 border-t border-stone-200 space-y-4">
                <h2 className="text-2xl font-serif font-bold text-stone-900 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-stone-700" />
                  <span>Frequently Asked Questions</span>
                </h2>
                <div className="space-y-3">
                  {article.faqs.map((faq, fIdx) => {
                    const isOpen = openFaqIndex === fIdx;
                    return (
                      <div
                        key={fIdx}
                        className="border border-stone-200 rounded-xl bg-white overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                          className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-stone-900 hover:bg-stone-50 transition-colors"
                          aria-expanded={isOpen}
                        >
                          <span>{faq.question}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-stone-500 shrink-0 transition-transform ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-stone-700 leading-relaxed border-t border-stone-100 pt-3">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Author Profile Bio Box */}
            <div className="bg-[#f7f4ee] border border-stone-200 rounded-xl p-6 flex flex-col sm:flex-row items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-stone-900 text-stone-100 flex items-center justify-center font-bold text-sm shrink-0">
                {article.author.avatar}
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-base font-bold text-stone-900">
                    Written by {article.author.name}
                  </h3>
                  <span className="text-stone-400">·</span>
                  <span className="text-xs text-stone-600">{article.author.role}</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {article.author.bio}
                </p>
              </div>
            </div>

            {/* Next / Previous Article Navigation */}
            <nav
              aria-label="Article navigation"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-stone-200"
            >
              {prevArticle ? (
                <Link
                  href={`/blog/${prevArticle.slug}/`}
                  className="group p-4 bg-white border border-stone-200 rounded-xl hover:border-stone-400 transition-all space-y-1 text-left"
                >
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                    <span>Previous Guide</span>
                  </span>
                  <p className="text-xs sm:text-sm font-serif font-bold text-stone-900 line-clamp-1 group-hover:text-stone-700">
                    {prevArticle.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}

              {nextArticle && (
                <Link
                  href={`/blog/${nextArticle.slug}/`}
                  className="group p-4 bg-white border border-stone-200 rounded-xl hover:border-stone-400 transition-all space-y-1 text-right sm:text-right"
                >
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 flex items-center justify-end gap-1">
                    <span>Next Guide</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <p className="text-xs sm:text-sm font-serif font-bold text-stone-900 line-clamp-1 group-hover:text-stone-700">
                    {nextArticle.title}
                  </p>
                </Link>
              )}
            </nav>
          </main>

          {/* Sticky Desktop Sidebar */}
          <aside className="hidden lg:block lg:col-span-4 space-y-6 sticky top-24">
            <TableOfContents items={article.tableOfContents} />

            {/* Compact Newsletter Widget */}
            <NewsletterBox compact />

            {/* Fast Nav to Topics */}
            <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                Related Reading Tracks
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link
                    href="/blog/seo-for-beginners/"
                    className="text-stone-700 hover:text-stone-950 hover:underline block"
                  >
                    → SEO for Beginners: Complete Guide
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/keyword-research-guide/"
                    className="text-stone-700 hover:text-stone-950 hover:underline block"
                  >
                    → Keyword Research Framework
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/website-speed-core-web-vitals/"
                    className="text-stone-700 hover:text-stone-950 hover:underline block"
                  >
                    → Optimize Web Speed & Core Web Vitals
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="pt-16 border-t border-stone-200 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Recommended Companion Guides
              </h2>
              <Link
                href="/blog/"
                className="text-xs font-semibold text-stone-800 hover:text-stone-950 inline-flex items-center gap-1"
              >
                <span>View Library</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <ArticleCard key={rel.id} article={rel} variant="standard" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
