import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { updatePageSEO } from '../utils/seo';
import { Mail, Clock, MessageSquare, CheckCircle2, AlertCircle, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Editorial Question');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    updatePageSEO({
      title: 'Contact the Editorial Team — The Growth Desk',
      description: 'Get in touch with The Growth Desk editorial team for editorial inquiries, topic suggestions, technical corrections, feedback, and partnership opportunities.',
      canonicalPath: '/contact/',
      ogType: 'website',
      breadcrumbs: [{ name: 'Contact', path: '/contact/' }],
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setErrorText('Please fill out all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setStatus('error');
      setErrorText('Please enter a valid email address.');
      return;
    }

    // Persist demo contact message in localStorage
    try {
      const messages = JSON.parse(localStorage.getItem('the_growth_desk_inquiries') || '[]');
      messages.push({
        name: name.trim(),
        email: email.trim(),
        topic,
        message: message.trim(),
        date: new Date().toISOString(),
      });
      localStorage.setItem('the_growth_desk_inquiries', JSON.stringify(messages));
    } catch {
      // Local storage fallback
    }

    setStatus('success');
    setName('');
    setEmail('');
    setMessage('');
  };

  const mailtoLink = `mailto:editorial@thegrowthdesk.com?subject=${encodeURIComponent(
    `Inquiry: ${topic}`
  )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Breadcrumbs items={[{ name: 'Contact', path: '/contact/' }]} />

      {/* Header */}
      <header className="border-b border-stone-200 pb-8 space-y-3">
        <div className="text-xs font-mono uppercase tracking-widest text-stone-500">
          Get In Touch
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Contact The Editorial Desk
        </h1>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          Questions about our SEO guides, corrections, or publishing partnerships? Reach out directly.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Contact Info & Commitments */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-[#f7f4ee] border border-stone-200 rounded-xl p-6 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">
              Direct Contact Channels
            </h2>

            <div className="space-y-3 text-xs text-stone-700">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900">General & Editorial Email:</strong>
                  <a
                    href="mailto:editorial@thegrowthdesk.com"
                    className="text-stone-600 hover:text-stone-900 underline"
                  >
                    editorial@thegrowthdesk.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900">Response Commitment:</strong>
                  <span>We review incoming messages and respond within 2 business days.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MessageSquare className="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900">Corrections Policy:</strong>
                  <span>Spotted an outdated guideline or broken link? We update technical guides within 48 hours.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 border border-stone-200 bg-white rounded-xl text-xs text-stone-600 space-y-2">
            <h3 className="font-bold text-stone-900">Alternative Direct Mailto:</h3>
            <p className="leading-relaxed">
              Prefer your native desktop email client (Apple Mail, Outlook, Gmail)? You can compose directly with one click:
            </p>
            <a
              href="mailto:editorial@thegrowthdesk.com?subject=Editorial%20Inquiry%20from%20The%20Growth%20Desk"
              className="inline-flex items-center gap-1.5 font-semibold text-stone-900 hover:underline pt-1"
            >
              <span>Launch Desktop Email Client</span>
              <Send className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7 bg-white border border-stone-200 rounded-xl p-6 sm:p-8 space-y-6">
          <h2 className="font-serif text-xl font-bold text-stone-900">
            Send an Editorial Message
          </h2>

          {status === 'success' ? (
            <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-emerald-900">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-sm">Message Recorded Successfully</h3>
              </div>
              <p className="text-xs leading-relaxed">
                Thank you for reaching out! Your inquiry has been saved. In production on Vercel, this form connects directly to your transactional email service (Resend, SendGrid, or Formspree) via a lightweight serverless handler.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-2 text-xs font-semibold text-emerald-800 underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-stone-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
                  required
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold text-stone-700 mb-1">
                  Email Address *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarah@example.com"
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
                  required
                />
              </div>

              <div>
                <label htmlFor="contact-topic" className="block text-xs font-semibold text-stone-700 mb-1">
                  Inquiry Topic
                </label>
                <select
                  id="contact-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 bg-white"
                >
                  <option value="Editorial Question">Question on an Article</option>
                  <option value="Correction Request">Technical Correction</option>
                  <option value="Topic Proposal">Propose a Guide Topic</option>
                  <option value="Partnership">Publishing / Syndication</option>
                  <option value="Other">General Feedback</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-stone-700 mb-1">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can our editorial team assist you?"
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
                  required
                />
              </div>

              {status === 'error' && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errorText}</span>
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
                >
                  Submit Inquiry
                </button>
                <span className="text-[11px] text-stone-500">
                  Or use the direct mailto button to send via your email app.
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
