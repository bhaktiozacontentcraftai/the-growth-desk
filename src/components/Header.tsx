import React, { useState } from 'react';
import { useRouter, Link } from '../utils/router';
import { Menu, X, BookOpen, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onOpenDeployGuide: () => void;
  onOpenNewsletter: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDeployGuide, onOpenNewsletter }) => {
  const { currentPath } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'All Articles', href: '/blog/' },
    { label: 'About', href: '/about/' },
    { label: 'Contact', href: '/contact/' },
    { label: 'Sitemap', href: '/sitemap.xml', external: true },
  ];

  const isActive = (href: string) => {
    if (href === '/blog/' && currentPath.startsWith('/blog/')) return true;
    return currentPath === href;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fbf9f5]/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-xl font-serif font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 group"
        >
          <span className="w-8 h-8 rounded bg-stone-900 text-stone-50 flex items-center justify-center font-sans text-sm font-semibold group-hover:bg-stone-800 transition-colors">
            GD
          </span>
          <span className="font-serif text-xl tracking-tight text-stone-900">
            The Growth Desk
          </span>
        </Link>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav
          className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            if (link.external) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-stone-950 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  isActive(link.href)
                    ? 'text-stone-950 font-semibold border-b-2 border-stone-900 pb-0.5'
                    : 'hover:text-stone-950'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Primary action button + guide helper */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenDeployGuide}
            className="text-xs font-medium text-stone-600 hover:text-stone-900 px-3 py-2 rounded border border-stone-300 hover:border-stone-400 transition-colors whitespace-nowrap"
            title="View instructions to connect to GitHub and deploy on Vercel"
          >
            Deploy on Vercel
          </button>
          <button
            type="button"
            onClick={onOpenNewsletter}
            className="px-4 py-2 text-xs font-semibold text-stone-50 bg-stone-900 rounded hover:bg-stone-800 active:bg-stone-950 transition-colors whitespace-nowrap shrink-0"
          >
            Subscribe
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-600 hover:text-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 rounded"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-[#fbf9f5] px-4 pt-3 pb-6 space-y-4">
          <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-1 text-base ${
                  isActive(link.href) ? 'font-semibold text-stone-900' : 'text-stone-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDeployGuide();
              }}
              className="w-full text-center py-2.5 text-xs font-medium text-stone-700 border border-stone-300 rounded"
            >
              GitHub & Vercel Guide
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenNewsletter();
              }}
              className="w-full text-center py-2.5 text-xs font-semibold text-white bg-stone-900 rounded"
            >
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
