import React, { useEffect } from 'react';
import { ARTICLES } from '../data/articles';
import { CATEGORIES } from '../data/categories';
import { ArticleCard } from '../components/ArticleCard';
import { NewsletterBox } from '../components/NewsletterBox';
import { Link } from '../utils/router';
import { updatePageSEO } from '../utils/seo';
import { ArrowRight, Sparkles, TrendingUp, Compass, ShieldCheck } from 'lucide-react';

interface HomePageProps {
  onOpenDeployGuide: () => void;
  onOpenNewsletter: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenDeployGuide, onOpenNewsletter }) => {
  useEffect(() => {
    updatePageSEO({
      title: 'The Growth Hacker — SEO & Growth Marketing Strategies',
      description: 'Grow organic traffic with The Growth Hacker. Explore proven SEO playbooks, beginner blogging guides, and content marketing strategies to rank higher today.',
      canonicalPath: '/',
      ogType: 'website',
      image: '/images/growth-hacker-hero.webp',
    });
  }, []);

  const featuredArticle = ARTICLES.find((a) => a.featured) || ARTICLES[0];
  const secondaryArticles = ARTICLES.filter((a) => a.id !== featuredArticle.id && a.popular).slice(0, 3);
  const remainingArticles = ARTICLES.filter(
    (a) => a.id !== featuredArticle.id && !secondaryArticles.some((sa) => sa.id === a.id)
  );

  return (
    <div className="space-y-16 sm:space-y-20 pb-12">
      {/* Editorial Header / Masthead */}
      <section className="border-b border-stone-200/80 pt-6 pb-12 text-center max-w-3xl mx-auto space-y-4 px-4">
        <div className="flex items-center justify-center gap-2 text-stone-500 text-xs font-mono uppercase tracking-widest">
          <span>The Growth Hacker</span>
          <span aria-hidden="true">·</span>
          <span>Independent Digital Publication</span>
          <span aria-hidden="true">·</span>
          <span>Updated Weekly</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-stone-900 leading-tight">
          The Growth Hacker: Practical strategies for organic search and digital growth.
        </h1>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          In-depth, beginner-friendly guides on SEO, blogging for beginners, keyword research, and site architecture for creators, bloggers, and small business founders.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/blog/"
            className="px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
          >
            Explore All 10 Guides
          </Link>
          <button
            type="button"
            onClick={onOpenDeployGuide}
            className="px-4 py-2.5 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded-lg hover:border-stone-500 transition-colors"
          >
            How to Deploy on Vercel
          </button>
        </div>
      </section>

      {/* Editorial Wide Hero Image */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
        <div className="relative aspect-16/7 sm:aspect-21/9 w-full overflow-hidden rounded-2xl border border-stone-200/90 shadow-sm bg-stone-100 group">
          <img
            src="/images/growth-hacker-hero.webp"
            alt="The Growth Hacker modern editorial desk featuring a laptop displaying compounding organic search analytics, strategy notebooks, and SEO planning blueprints"
            width={1200}
            height={675}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-101"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-8 sm:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
            <div className="space-y-1">
              <span className="text-[11px] font-mono tracking-widest uppercase text-stone-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                The Growth Hacker · Field Guide &amp; Frameworks
              </span>
              <p className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-white drop-shadow-sm">
                Mastering the Art &amp; Science of Modern Search Acquisition
              </p>
            </div>
            <Link
              href="/blog/blogging-for-beginners/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/95 hover:bg-white text-stone-900 px-4 py-2 rounded-lg transition-colors shadow-sm shrink-0 backdrop-blur-xs"
            >
              <span>Start With Chapter 1: How to Start a Blog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
        <figcaption className="text-[11px] text-stone-500 italic text-right px-2 flex items-center justify-between">
          <span className="not-italic uppercase font-mono text-[10px] text-stone-400">Featured Visual</span>
          <span>The Growth Hacker digital workspace: tracking search growth trends, content sprints, and compounding traffic metrics.</span>
        </figcaption>
      </section>

      {/* Primary Featured Story (Lead Story) */}
      <section aria-labelledby="featured-story-heading" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2
            id="featured-story-heading"
            className="text-xs uppercase font-semibold tracking-wider text-stone-600 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-stone-700" />
            <span>Chapter 1: How Do You Build Organic Traffic? Featured Lead Guide</span>
          </h2>
          <Link
            href="/blog/"
            className="text-xs font-semibold text-stone-800 hover:text-stone-950 inline-flex items-center gap-1"
          >
            <span>View All Guides</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <ArticleCard article={featuredArticle} variant="featured" />
      </section>

      {/* Secondary Salience: Popular Reading Strip */}
      <section aria-labelledby="popular-heading" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-stone-200 pb-3 mb-6 flex items-center justify-between">
          <h2
            id="popular-heading"
            className="text-xs uppercase font-semibold tracking-wider text-stone-600 flex items-center gap-1.5"
          >
            <TrendingUp className="w-3.5 h-3.5 text-stone-700" />
            <span>Chapter 2: Essential Growth Guides: How to Start and Scale Your Blog</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {secondaryArticles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="standard" />
          ))}
        </div>
      </section>

      {/* Topic Directory / Category Grid */}
      <section aria-labelledby="categories-heading" className="bg-[#f7f4ee] border-y border-stone-200 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h2 id="categories-heading" className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Chapter 3: Which Growth Discipline Should You Master First?
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Structured learning tracks covering search engine optimization, content velocity, and analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES.map((cat) => {
              const articleCount = ARTICLES.filter((a) => a.category === cat.id).length;
              return (
                <Link
                  key={cat.id}
                  href={`/blog/?category=${cat.id}`}
                  className="group bg-white border border-stone-200/90 rounded-xl p-5 hover:border-stone-400 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-stone-900 group-hover:text-stone-700">
                        {cat.name}
                      </span>
                      <span className="text-[11px] font-mono text-stone-500">
                        {articleCount} {articleCount === 1 ? 'guide' : 'guides'}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                  <div className="pt-4 flex items-center gap-1 text-[11px] font-semibold text-stone-900 group-hover:translate-x-1 transition-transform">
                    <span>Explore Track</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Articles Grid */}
      <section aria-labelledby="latest-heading" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-stone-200 pb-3 mb-8 flex items-center justify-between">
          <h2
            id="latest-heading"
            className="text-xs uppercase font-semibold tracking-wider text-stone-600 flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-stone-700" />
            <span>Chapter 4: The Growth Hacker Guide Library: All 10 Field Guides</span>
          </h2>
          <span className="text-xs font-mono text-stone-500">
            {ARTICLES.length} Guides Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {remainingArticles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="standard" />
          ))}
        </div>
      </section>

      {/* Answer Engine Optimization (AEO / GEO) Q&A Section */}
      <section aria-labelledby="home-faq-heading" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-stone-200 bg-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="space-y-2 border-b border-stone-100 pb-4">
            <span className="text-[11px] font-mono uppercase tracking-widest text-stone-500">
              Answer Engine Optimization · AEO Reference
            </span>
            <h2 id="home-faq-heading" className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Chapter 5: Frequently Asked Questions: How Does The Growth Hacker Method Work?
            </h2>
          </div>

          <div className="space-y-5 text-stone-800 text-sm leading-relaxed divide-y divide-stone-100">
            <div className="space-y-1.5 pt-1">
              <h3 className="font-semibold text-stone-950 text-sm sm:text-base">
                What is The Growth Hacker framework for organic search?
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm">
                The Growth Hacker framework combines editorial depth with rigorous technical SEO, disciplined keyword research, and clean on-page optimization. By creating defensible, long-form guides that directly address search intent, independent blogs build enduring organic traffic that compounds over time.
              </p>
            </div>

            <div className="space-y-1.5 pt-4">
              <h3 className="font-semibold text-stone-950 text-sm sm:text-base">
                Why should founders and creators prioritize SEO over social media algorithms?
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm">
                Social media posts decay within hours, and algorithms can eliminate reach overnight. In contrast, articles optimized for search engines provide compounding value, capturing high-intent visitors daily for months or years after publication.
              </p>
            </div>

            <div className="space-y-1.5 pt-4">
              <h3 className="font-semibold text-stone-950 text-sm sm:text-base">
                How quickly does organic SEO traffic begin to compound?
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm">
                New domains typically begin indexing and ranking for low-competition long-tail keywords within 6 to 12 weeks. With consistent weekly publishing and strict on-page optimization, domain authority and organic impressions typically accelerate significantly around months 4 through 6.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsletterBox />
      </div>

      {/* Editorial Trust Statement */}
      <section className="max-w-4xl mx-auto px-4 text-center border-t border-stone-200/60 pt-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs text-stone-500 font-medium">
          <ShieldCheck className="w-4 h-4 text-stone-700" />
          <span>Our Editorial Guarantee</span>
        </div>
        <p className="text-xs text-stone-600 leading-relaxed max-w-xl mx-auto">
          Every guide on The Growth Desk is written from tested methodologies. We do not invent fake case studies or publish automated filler. Every step has been executed in production.
        </p>
      </section>
    </div>
  );
};
