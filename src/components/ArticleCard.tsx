import React, { useState } from 'react';
import { Article } from '../types/blog';
import { Link } from '../utils/router';
import { ArrowRight, BookOpen } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  variant?: 'featured' | 'standard' | 'compact';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'standard' }) => {
  const [imageError, setImageError] = useState(false);
  const articleHref = `/blog/${article.slug}/`;

  if (variant === 'featured') {
    return (
      <article className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-stone-200/90 rounded-xl p-6 lg:p-8 hover:border-stone-400 transition-all shadow-xs">
        <div className="lg:col-span-7 space-y-4">
          {/* Clean unboxed metadata kicker */}
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <span className="text-stone-900 font-semibold">{article.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedAt}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readingTime}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight group-hover:text-stone-700 transition-colors">
            <Link href={articleHref}>{article.title}</Link>
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>

          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-stone-600">
              <span className="w-6 h-6 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center font-medium text-[10px]">
                {article.author.avatar}
              </span>
              <span>{article.author.name}</span>
            </div>

            <Link
              href={articleHref}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 group-hover:translate-x-1 transition-transform"
            >
              <span>Read Full Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 aspect-4/3 w-full overflow-hidden rounded-lg bg-stone-100 border border-stone-200/60 relative">
          {!imageError ? (
            <img
              src={article.heroImage}
              alt={article.altText}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-stone-100 text-stone-400">
              <BookOpen className="w-8 h-8 mb-2 opacity-50" />
              <span className="text-xs text-stone-500 font-medium">{article.categoryLabel}</span>
            </div>
          )}
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="group py-4 border-b border-stone-200 last:border-b-0 space-y-1.5">
        <div className="flex items-center gap-2 text-[11px] text-stone-500 font-medium">
          <span className="text-stone-800 font-semibold">{article.categoryLabel}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readingTime}</span>
        </div>
        <h3 className="text-base font-serif font-semibold text-stone-900 group-hover:text-stone-700 transition-colors">
          <Link href={articleHref}>{article.title}</Link>
        </h3>
        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
          {article.excerpt}
        </p>
      </article>
    );
  }

  // Standard card
  return (
    <article className="group flex flex-col bg-white border border-stone-200/90 rounded-xl overflow-hidden hover:border-stone-400 transition-all shadow-xs">
      <div className="aspect-16/10 w-full overflow-hidden bg-stone-100 border-b border-stone-200/60 relative">
        {!imageError ? (
          <img
            src={article.heroImage}
            alt={article.altText}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-stone-100 text-stone-400">
            <BookOpen className="w-8 h-8 mb-2 opacity-50" />
            <span className="text-xs text-stone-500 font-medium">{article.categoryLabel}</span>
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Zero-pill unboxed metadata */}
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <span className="text-stone-900 font-semibold">{article.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readingTime}</span>
          </div>

          <h3 className="text-lg font-serif font-bold text-stone-900 tracking-tight group-hover:text-stone-700 transition-colors line-clamp-2">
            <Link href={articleHref}>{article.title}</Link>
          </h3>

          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="text-stone-500">{article.publishedAt}</span>
          <Link
            href={articleHref}
            className="inline-flex items-center gap-1 font-semibold text-stone-900 group-hover:translate-x-0.5 transition-transform"
          >
            <span>Read Guide</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </article>
  );
};
