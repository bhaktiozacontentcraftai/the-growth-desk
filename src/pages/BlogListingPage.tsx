import React, { useState, useEffect, useMemo } from 'react';
import { ARTICLES } from '../data/articles';
import { CATEGORIES } from '../data/categories';
import { ArticleCard } from '../components/ArticleCard';
import { updatePageSEO } from '../utils/seo';
import { Search, SlidersHorizontal, RotateCcw, BookOpen } from 'lucide-react';
import { CategoryId } from '../types/blog';

export const BlogListingPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'reading-time' | 'title'>('newest');
  const [visibleCount, setVisibleCount] = useState(6);

  // Check URL query parameter on mount if present (e.g. ?category=seo or ?q=keyword)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category');
      const qParam = params.get('q');
      if (catParam && CATEGORIES.some((c) => c.id === catParam)) {
        setSelectedCategory(catParam as CategoryId);
      }
      if (qParam) {
        setSearchQuery(qParam);
      }
    }
  }, []);

  useEffect(() => {
    const categoryObj = CATEGORIES.find((c) => c.id === selectedCategory);
    const title = categoryObj
      ? `${categoryObj.name} Guides — The Growth Desk`
      : 'SEO & Content Marketing Guides Library — The Growth Desk';
    const description = categoryObj
      ? `Explore actionable ${categoryObj.name.toLowerCase()} guides, practical checklists, and proven growth tutorials published by The Growth Desk editorial team.`
      : 'Explore our complete library of actionable SEO guides, content marketing blueprints, technical optimization checklists, and blogging tutorials for creators.';

    updatePageSEO({
      title,
      description,
      canonicalPath: '/blog/',
      ogType: 'website',
      breadcrumbs: [{ name: 'Articles', path: '/blog/' }],
    });
  }, [selectedCategory]);

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      // Category filter
      if (selectedCategory !== 'all' && article.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inTitle = article.title.toLowerCase().includes(query);
        const inExcerpt = article.excerpt.toLowerCase().includes(query);
        const inKeyword = article.targetKeyword.toLowerCase().includes(query);
        const inCategory = article.categoryLabel.toLowerCase().includes(query);
        return inTitle || inExcerpt || inKeyword || inCategory;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'reading-time') {
        const timeA = parseInt(a.readingTime, 10) || 0;
        const timeB = parseInt(b.readingTime, 10) || 0;
        return timeA - timeB;
      }
      // default: newest by id/date
      return b.id.localeCompare(a.id);
    });
  }, [searchQuery, selectedCategory, sortBy]);

  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('newest');
    setVisibleCount(6);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="border-b border-stone-200 pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-500">
          <span>Editorial Index</span>
          <span aria-hidden="true">·</span>
          <span>{ARTICLES.length} Guides in Library</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          The Growth Library
        </h1>
        <p className="text-stone-600 text-sm sm:text-base max-w-2xl leading-relaxed">
          Comprehensive, field-tested articles covering search engine optimization, keyword strategy, site performance, and organic customer acquisition.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="space-y-4 bg-white border border-stone-200/90 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(6);
              }}
              placeholder="Search guides by keyword, topic, or question..."
              aria-label="Search articles"
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 focus:bg-white transition-colors"
            />
          </div>

          {/* Sort Controls */}
          <div className="w-full md:w-auto flex items-center justify-between sm:justify-end gap-3 text-xs">
            <span className="text-stone-500 font-medium whitespace-nowrap flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Sort by:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 font-medium text-xs focus:outline-none focus:border-stone-900"
            >
              <option value="newest">Latest Published</option>
              <option value="reading-time">Reading Time (Shortest)</option>
              <option value="title">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Tabs (Interactive Filter Controls) */}
        <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setVisibleCount(6);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-stone-900 text-stone-50'
                : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
            }`}
          >
            All Disciplines ({ARTICLES.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = ARTICLES.filter((a) => a.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setVisibleCount(6);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  isSelected
                    ? 'bg-stone-900 text-stone-50'
                    : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-stone-500">
        <span>
          Showing <span className="font-semibold text-stone-900 font-mono">{filteredArticles.length}</span> {filteredArticles.length === 1 ? 'article' : 'articles'}
          {selectedCategory !== 'all' && (
            <span> in <span className="text-stone-900 font-medium">"{CATEGORIES.find((c) => c.id === selectedCategory)?.name}"</span></span>
          )}
          {searchQuery && (
            <span> matching <span className="text-stone-900 font-medium">"{searchQuery}"</span></span>
          )}
        </span>

        {(searchQuery || selectedCategory !== 'all') && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1 text-stone-700 hover:text-stone-950 font-medium underline"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleArticles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="standard" />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-stone-200 rounded-xl space-y-4">
          <BookOpen className="w-10 h-10 text-stone-400 mx-auto opacity-70" />
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              No articles found
            </h3>
            <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
              We couldn't find any articles matching your search query or filter criteria. Try searching for "SEO", "Keywords", or "Content".
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-4 py-2 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Pagination / Load More */}
      {hasMore && (
        <div className="text-center pt-6">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => Math.min(prev + 6, filteredArticles.length))}
            className="px-6 py-3 text-xs font-semibold text-stone-900 bg-white border border-stone-300 rounded-lg hover:border-stone-500 hover:bg-stone-50 transition-all shadow-xs"
          >
            Load More Articles ({filteredArticles.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
};
