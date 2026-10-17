import React from 'react';
import { Link } from '../utils/router';
import { CATEGORIES } from '../data/categories';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenDeployGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDeployGuide }) => {
  return (
    <footer className="border-t border-stone-200 bg-[#f7f4ee] text-stone-700 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="inline-block font-serif text-xl font-bold text-stone-900">
              The Growth Desk
            </Link>
            <p className="text-sm leading-relaxed text-stone-600">
              An independent editorial publication dedicated to actionable search engine optimization, content strategy, and organic business growth for creators and small businesses.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenDeployGuide}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-800 hover:text-stone-950 underline underline-offset-4"
              >
                <span>Vercel & GitHub Deployment Guide</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Col 2: Topics */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-stone-900 mb-4">
              Core Topics
            </h3>
            <ul className="space-y-2.5 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/blog/?category=${cat.id}`}
                    className="text-stone-600 hover:text-stone-950 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Editorial & Company */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-stone-900 mb-4">
              Editorial & Team
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about/" className="text-stone-600 hover:text-stone-950 transition-colors">
                  About The Publication
                </Link>
              </li>
              <li>
                <Link href="/contact/" className="text-stone-600 hover:text-stone-950 transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
              <li>
                <Link href="/blog/" className="text-stone-600 hover:text-stone-950 transition-colors">
                  Full Article Index
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Technical SEO & Compliance */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-stone-900 mb-4">
              Technical & Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-stone-600 hover:text-stone-950 transition-colors"
                >
                  <span>XML Sitemap (sitemap.xml)</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-stone-600 hover:text-stone-950 transition-colors"
                >
                  <span>Robots Directive (robots.txt)</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <Link href="/privacy-policy/" className="text-stone-600 hover:text-stone-950 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer/" className="text-stone-600 hover:text-stone-950 transition-colors">
                  Editorial Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} The Growth Desk. All rights reserved. Built for production deployment.</p>
          <div className="flex items-center gap-4">
            <span className="text-stone-400">·</span>
            <span className="font-mono text-[11px] text-stone-600">Static Export Ready</span>
            <span className="text-stone-400">·</span>
            <span className="font-mono text-[11px] text-stone-600">Vercel Configured</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
