import React, { useEffect } from 'react';
import { Link } from '../utils/router';
import { updatePageSEO } from '../utils/seo';
import { ARTICLES } from '../data/articles';
import { AlertCircle, ArrowLeft, BookOpen } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    updatePageSEO({
      title: 'Page Not Found (404) — The Growth Desk',
      description: 'The requested page or guide could not be located. Explore our core search engine optimization, content marketing, and technical SEO guides from the homepage.',
      noindex: true,
      ogType: 'website',
    });
  }, []);

  const popularGuides = ARTICLES.slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-stone-200/80 text-stone-700 text-xs font-mono uppercase tracking-wider">
        <AlertCircle className="w-3.5 h-3.5" />
        <span>HTTP Status 404: Route Not Found</span>
      </div>

      <div className="space-y-3">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
          The requested page could not be found
        </h1>
        <p className="text-stone-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          The URL you followed may be mistyped or the article has moved. Browse our full library or check our most popular beginner guides below.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Homepage</span>
        </Link>
        <Link
          href="/blog/"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-medium text-stone-800 bg-white border border-stone-300 rounded-lg hover:border-stone-500 transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Browse All 10 Guides</span>
        </Link>
      </div>

      {/* Suggested Popular Guides */}
      <div className="pt-10 border-t border-stone-200 text-left space-y-4">
        <h2 className="text-xs uppercase font-semibold tracking-wider text-stone-500">
          Popular Editorial Recommendations:
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {popularGuides.map((guide) => (
            <Link
              key={guide.id}
              href={`/blog/${guide.slug}/`}
              className="p-4 bg-white border border-stone-200 rounded-lg hover:border-stone-400 transition-colors space-y-1 block"
            >
              <span className="text-[10px] text-stone-500 font-medium">
                {guide.categoryLabel}
              </span>
              <p className="font-serif text-xs font-bold text-stone-900 line-clamp-2">
                {guide.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
