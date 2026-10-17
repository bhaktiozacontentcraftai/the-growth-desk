import React, { useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { updatePageSEO } from '../utils/seo';
import { ShieldCheck, Target, Users, BookOpen, Compass, CheckCircle2 } from 'lucide-react';
import { Link } from '../utils/router';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    updatePageSEO({
      title: 'About The Growth Desk — Our Editorial Mission & Standards',
      description: 'Learn about The Growth Desk, our editorial standards, our focus on technical SEO and content strategy, and our commitment to tested growth frameworks.',
      canonicalPath: '/about/',
      ogType: 'website',
      breadcrumbs: [{ name: 'About', path: '/about/' }],
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Breadcrumbs items={[{ name: 'About', path: '/about/' }]} />

      {/* Header */}
      <header className="border-b border-stone-200 pb-8 space-y-3">
        <div className="text-xs font-mono uppercase tracking-widest text-stone-500">
          Editorial Mission
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          About The Growth Desk
        </h1>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          An independent digital publication committed to deconstructing organic search, content strategy, and sustainable business growth.
        </p>
      </header>

      {/* Narrative Section */}
      <section className="space-y-6 text-stone-800 text-sm sm:text-base leading-relaxed">
        <p className="editorial-dropcap">
          The Growth Desk was founded with a singular conviction: search engine optimization and digital marketing should be transparent, accessible, and grounded in real testing rather than hearsay. In an era where online advice is cluttered with recycled platitudes and automated filler, our mission is to provide clear, actionable blueprints that independent creators and small businesses can execute immediately.
        </p>
        <p>
          We do not publish speculative predictions or promote shady "black hat" shortcuts that put your domain at risk. Every framework, checklist, and audit procedure we describe is grounded in official search documentation, empirical performance testing, and hands-on digital growth experience.
        </p>
      </section>

      {/* Target Audience Pillars */}
      <section className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 space-y-6">
        <h2 className="font-serif text-2xl font-bold text-stone-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-stone-700" />
          <span>Who We Write For</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-stone-900">Beginners & Students</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Individuals starting their journey in digital marketing who need clear, jargon-free explanations of how search engines crawl, index, and rank web pages.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-stone-900">Bloggers & Creators</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Writers and independent publishers seeking to turn their domain into a compounding audience asset that drives organic readers month after month.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-stone-900">Freelancers & Consultants</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Solo service professionals looking to establish domain authority and attract qualified inbound client inquiries without expensive ads.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-stone-900">Small Business Owners</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Bootstrapped founders who need a reliable, cost-effective customer acquisition channel to compete sustainably against massive incumbents.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Standards */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-stone-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-stone-700" />
          <span>Our Editorial Standards</span>
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-stone-700">
          <div className="p-4 bg-stone-100 rounded-lg flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-900">Zero Fabricated Data: </strong>
              We do not invent case studies, metrics, or anonymous success stories. All benchmarks represent verifiable industry best practices.
            </div>
          </div>
          <div className="p-4 bg-stone-100 rounded-lg flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-900">Practical Step-by-Step Rigor: </strong>
              Every guide must include concrete, actionable checklists or frameworks that a reader can implement without buying proprietary software.
            </div>
          </div>
          <div className="p-4 bg-stone-100 rounded-lg flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-900">Regular Content Refresh: </strong>
              Search engine guidelines evolve continuously. We revisit published articles quarterly to update screenshots, recommendations, and Core Web Vitals thresholds.
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-stone-600">
          Have an editorial inquiry or wish to propose a topic?
        </div>
        <Link
          href="/contact/"
          className="px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
        >
          Contact Editorial Desk
        </Link>
      </div>
    </div>
  );
};
