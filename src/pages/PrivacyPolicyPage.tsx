import React, { useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { updatePageSEO } from '../utils/seo';

export const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    updatePageSEO({
      title: 'Privacy Policy — The Growth Desk',
      description: 'Privacy policy for The Growth Desk. Learn what data we collect, how we respect user privacy, cookie disclosures, and data protection practices.',
      canonicalPath: '/privacy-policy/',
      ogType: 'website',
      breadcrumbs: [{ name: 'Privacy Policy', path: '/privacy-policy/' }],
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ name: 'Privacy Policy', path: '/privacy-policy/' }]} />

      <header className="border-b border-stone-200 pb-8 space-y-3">
        <div className="text-xs font-mono uppercase tracking-widest text-stone-500">
          Legal & Compliance
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-stone-500 font-mono">
          Effective Date: October 1, 2026 · Last Updated: October 15, 2026
        </p>
      </header>

      <div className="space-y-8 text-stone-800 text-xs sm:text-sm leading-relaxed max-w-prose">
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-stone-900">1. Overview and Scope</h2>
          <p>
            At The Growth Desk (accessible from https://thegrowthdesk.com), accessible privacy and transparency are core values. This Privacy Policy outlines the types of personal and non-personal data collected, recorded, and utilized when you visit our publication.
          </p>
          <p>
            We do not sell, rent, or trade your personal data to third-party data brokers under any circumstances.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-stone-900">2. Information We Collect</h2>
          <p>
            We collect information only when there is a legitimate reason to do so:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>
              <strong>Directly Provided Information:</strong> When you subscribe to our newsletter or submit an inquiry through our contact form, we collect your email address, name, and the text of your message.
            </li>
            <li>
              <strong>Log and Device Data:</strong> Like most web servers, our hosting infrastructure records standard log files, including anonymized IP addresses, browser type, referring pages, timestamps, and page request counts.
            </li>
            <li>
              <strong>Aggregate Analytics:</strong> We may utilize privacy-respecting analytics tools to evaluate total visits, average reading time, and popular guide queries to improve our editorial content.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-stone-900">3. Cookies and Web Storage</h2>
          <p>
            We use minimal cookies and browser local storage strictly necessary to remember your reading preferences (such as collapsed table of contents or newsletter submission status). We do not deploy cross-site retargeting or intrusive behavioral tracking cookies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-stone-900">4. Third-Party Links & Integrations</h2>
          <p>
            Our articles frequently include hyperlinks to external resources, official search documentation (e.g., Google Search Central), and third-party tools. We have no control over the privacy practices of external websites and encourage readers to review their independent policies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-stone-900">5. Your Data Rights (GDPR & CCPA)</h2>
          <p>
            Depending on your jurisdiction, you possess the right to request access to the personal data we hold about you, request corrections to inaccurate records, or request complete deletion of your newsletter subscription records.
          </p>
          <p>
            To exercise any of these rights, contact our Data Protection representative at <a href="mailto:privacy@thegrowthdesk.com" className="text-stone-900 underline font-medium">privacy@thegrowthdesk.com</a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-stone-900">6. Policy Updates</h2>
          <p>
            We may update this Privacy Policy periodically to reflect changes in our editorial operations or applicable legal requirements. The updated date will always be visible at the top of this document.
          </p>
        </section>
      </div>
    </div>
  );
};
