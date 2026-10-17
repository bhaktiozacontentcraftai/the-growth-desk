import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';

interface NewsletterBoxProps {
  compact?: boolean;
}

export const NewsletterBox: React.FC<NewsletterBoxProps> = ({ compact = false }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    // Save locally to persist user subscription demo state
    try {
      const existing = JSON.parse(localStorage.getItem('the_growth_desk_subscribers') || '[]');
      if (!existing.includes(email.trim())) {
        existing.push(email.trim());
        localStorage.setItem('the_growth_desk_subscribers', JSON.stringify(existing));
      }
    } catch {
      // Local storage fallback
    }

    setStatus('success');
    setMessage('Welcome aboard! You have joined 12,000+ creators receiving our weekly search and growth teardowns.');
    setEmail('');
  };

  if (compact) {
    return (
      <div className="bg-stone-100/80 border border-stone-200/90 rounded-xl p-6">
        <h3 className="font-serif text-lg font-bold text-stone-900 mb-1.5">
          Get Weekly Search Teardowns
        </h3>
        <p className="text-xs text-stone-600 leading-relaxed mb-4">
          No fluff. Every Thursday, we send one actionable SEO framework and one real-world case study.
        </p>

        {status === 'success' ? (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">{message}</p>
              <p className="text-[11px] text-emerald-700 mt-1">
                (Subscription recorded locally. When deployed to Vercel, this hooks into your provider via an API endpoint).
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="name@work.com"
                className="w-full text-xs px-3.5 py-2.5 rounded border border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
                required
              />
            </div>
            {status === 'error' && (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{message}</span>
              </p>
            )}
            <button
              type="submit"
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-stone-900 rounded hover:bg-stone-800 transition-colors"
            >
              Join Free Newsletter
            </button>
            <p className="text-[10px] text-stone-500 text-center">
              Unsubscribe anytime. Zero marketing spam.
            </p>
          </form>
        )}
      </div>
    );
  }

  return (
    <section className="bg-stone-900 text-stone-100 rounded-2xl p-8 sm:p-12 my-12 relative overflow-hidden">
      <div className="max-w-2xl mx-auto text-center space-y-4 relative z-10">
        <div className="inline-flex items-center gap-2 text-stone-300 text-xs uppercase tracking-widest font-mono">
          <Mail className="w-3.5 h-3.5" />
          <span>The Growth Dispatch</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          Read actionable growth strategies before your competitors do
        </h2>

        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
          Join over 12,000 founders, content marketers, and creators who read our weekly breakdowns on technical SEO, content velocity, and search rankings.
        </p>

        {status === 'success' ? (
          <div className="mt-6 p-4 bg-stone-800 border border-stone-700 rounded-xl text-left text-xs text-stone-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-emerald-300 text-sm">{message}</p>
              <p className="text-stone-400">
                A verification link has been simulated. Ready for production integration on Vercel with Beehiiv, ConvertKit, or Mailchimp.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Enter your email address"
                aria-label="Email address for newsletter"
                className="flex-1 px-4 py-3 rounded-lg text-sm bg-stone-800 border border-stone-700 text-white placeholder:text-stone-400 focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-400"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-lg text-sm font-semibold text-stone-900 bg-white hover:bg-stone-100 transition-colors shrink-0"
              >
                Subscribe
              </button>
            </div>

            {status === 'error' && (
              <p className="text-xs text-red-400 text-left flex items-center gap-1.5 pt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{message}</span>
              </p>
            )}

            <div className="flex items-center justify-center gap-4 text-[11px] text-stone-400 pt-1">
              <span>Weekly edition</span>
              <span aria-hidden="true">·</span>
              <span>No spam guarantee</span>
              <span aria-hidden="true">·</span>
              <span>Single-click unsubscribe</span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
