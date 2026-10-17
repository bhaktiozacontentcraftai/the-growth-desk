import React, { useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { updatePageSEO } from '../utils/seo';

export const DisclaimerPage: React.FC = () => {
  useEffect(() => {
    updatePageSEO({
      title: 'Editorial & Affiliate Disclaimer — The Growth Desk',
      description: 'Read The Growth Desk editorial and affiliate disclaimer. Disclosures regarding our educational purpose, affiliate partnerships, and testing methodologies.',
      canonicalPath: '/disclaimer/',
      ogType: 'website',
      breadcrumbs: [{ name: 'Disclaimer', path: '/disclaimer/' }],
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ name: 'Disclaimer', path: '/disclaimer/' }]} />

      <header className="border-b border-stone-200 pb-8 space-y-3">
        <div className="text-xs font-mono uppercase tracking-widest text-stone-500">
          Editorial Disclosure
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Editorial & Affiliate Disclaimer
        </h1>
        <p className="text-xs text-stone-500 font-mono">
          Last Updated: October 15, 2026
        </p>
      </header>

      <div className="space-y-8 text-stone-800 text-xs sm:text-sm leading-relaxed max-w-prose">
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-stone-900">1. Informational & Educational Purpose Only</h2>
          <p>
            The content, frameworks, checklists, and guides published on The Growth Desk (https://thegrowthdesk.com) are intended solely for general educational and informational purposes. While we make every effort to ensure that the search engine optimization (SEO) techniques and digital marketing strategies shared are accurate, current, and tested, search algorithms evolve continually.
          </p>
          <p>
            Implementation of any recommendation is done at your own discretion. The Growth Desk makes no representations or warranties regarding specific traffic volumes, revenue outcomes, or guaranteed search ranking positions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-stone-900">2. No Professional Legal or Financial Advice</h2>
          <p>
            The articles on this publication do not constitute legal, financial, accounting, or professional consulting advice. Before making business decisions involving business registration, contracts, or tax obligations, consult a qualified attorney or certified financial planner.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-stone-900">3. Affiliate Relationship Disclosure (FTC Compliance)</h2>
          <p>
            In compliance with Federal Trade Commission (FTC) guidelines, please note that certain outbound links to software tools, web hosting services, books, and courses on this website may be affiliate links.
          </p>
          <p>
            If you click through an affiliate link and make a purchase, The Growth Desk may receive an affiliate commission at no additional cost to you. We strictly recommend only products, services, and software tools that our editorial team has independently tested, vetted, and found valuable. Our editorial opinions are never bought, sponsored, or altered by affiliate partnerships.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-stone-900">4. Third-Party Trademarks</h2>
          <p>
            Google, Google Search Console, Google Analytics, PageSpeed Insights, and related logos and brand names are registered trademarks of Google LLC. The Growth Desk is an independent publication and is not affiliated with, endorsed by, or sponsored by Google LLC.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-stone-900">5. Questions & Feedback</h2>
          <p>
            If you have questions regarding our disclosures, affiliate relationships, or wish to report an inaccuracy, contact our editorial team at <a href="mailto:editorial@thegrowthdesk.com" className="text-stone-900 underline font-medium">editorial@thegrowthdesk.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};
