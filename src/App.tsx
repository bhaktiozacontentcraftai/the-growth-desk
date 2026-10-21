/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RouterProvider, useRouter, normalizePath } from './utils/router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DeploymentModal } from './components/DeploymentModal';
import { HomePage } from './pages/HomePage';
import { BlogListingPage } from './pages/BlogListingPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ARTICLES } from './data/articles';

function AppContent() {
  const { currentPath } = useRouter();
  const [deployGuideOpen, setDeployGuideOpen] = useState(false);
  const [newsletterOpen, setNewsletterOpen] = useState(false);

  const normalized = normalizePath(currentPath);

  // Match routes
  let PageComponent = <NotFoundPage />;

  if (normalized === '/' || normalized === '/the-growth-idea/') {
    PageComponent = (
      <HomePage
        onOpenDeployGuide={() => setDeployGuideOpen(true)}
        onOpenNewsletter={() => setNewsletterOpen(true)}
      />
    );
  } else if (normalized === '/blog/') {
    PageComponent = <BlogListingPage />;
  } else if (normalized === '/about/') {
    PageComponent = <AboutPage />;
  } else if (normalized === '/contact/') {
    PageComponent = <ContactPage />;
  } else if (normalized === '/privacy-policy/') {
    PageComponent = <PrivacyPolicyPage />;
  } else if (normalized === '/disclaimer/') {
    PageComponent = <DisclaimerPage />;
  } else if (normalized.startsWith('/blog/')) {
    // Extract slug
    const clean = normalized.replace(/^\/blog\//, '').replace(/\/$/, '');
    const matchedArticle = ARTICLES.find((a) => a.slug === clean);
    if (matchedArticle) {
      PageComponent = <ArticleDetailPage slug={clean} />;
    } else {
      PageComponent = <NotFoundPage />;
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f5] text-stone-900 selection:bg-stone-900 selection:text-white">
      <Header
        onOpenDeployGuide={() => setDeployGuideOpen(true)}
        onOpenNewsletter={() => setNewsletterOpen(true)}
      />

      <main className="flex-1" id="main-content">
        {PageComponent}
      </main>

      <Footer onOpenDeployGuide={() => setDeployGuideOpen(true)} />

      {/* Deployment Modal */}
      <DeploymentModal
        isOpen={deployGuideOpen}
        onClose={() => setDeployGuideOpen(false)}
      />

      {/* Quick Newsletter Modal */}
      {newsletterOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#fbf9f5] border border-stone-300 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setNewsletterOpen(false)}
              className="absolute top-4 right-4 p-1 text-stone-500 hover:text-stone-900 rounded"
              aria-label="Close dialog"
            >
              ✕
            </button>
            <div className="pt-2">
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                Subscribe to The Growth Dispatch
              </h3>
              <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                Join 12,000+ creators receiving our weekly teardown of search algorithms and growth tactics.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for subscribing! Your email has been saved.');
                  setNewsletterOpen(false);
                }}
                className="space-y-3"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full text-xs px-3.5 py-2.5 rounded border border-stone-300 bg-white"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-semibold text-white bg-stone-900 rounded hover:bg-stone-800"
                >
                  Join Free
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export interface AppProps {
  initialPath?: string;
}

export default function App({ initialPath }: AppProps = {}) {
  return (
    <RouterProvider initialPath={initialPath}>
      <AppContent />
    </RouterProvider>
  );
}
