import React, { useState } from 'react';
import { X, Copy, Check, Terminal, ExternalLink, Globe, GitBranch } from 'lucide-react';

interface DeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeploymentModal: React.FC<DeploymentModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      title: '1. Initialize Local Git Repository',
      desc: 'Run these commands in your project root to initialize git and make your first commit:',
      command: `git init\ngit add .\ngit commit -m "feat: complete SEO-optimized blog website for The Growth Desk"`,
    },
    {
      title: '2. Push to GitHub',
      desc: 'Connect your local repository to your GitHub repository and push:',
      command: `git branch -M main\ngit remote add origin https://github.com/bhaktiozacontentcraftai/the-growth-desk.git\ngit push -u origin main`,
    },
    {
      title: '3. Import Repository into Vercel',
      desc: 'Log in to vercel.com, click "Add New... > Project", and select your GitHub repository.',
      notes: [
        'Framework Preset: Vite',
        'Build Command: npm run build',
        'Output Directory: dist',
        'Rewrites: Handled automatically by the included vercel.json',
      ],
    },
    {
      title: '4. Set Production Canonical Base URL',
      desc: 'In Vercel Project Settings > Environment Variables, set your custom domain:',
      command: `VITE_SITE_URL=https://thegrowthdesk.com`,
      notes: [
        'This ensures all canonical tags, OpenGraph tags, and sitemaps resolve with your custom production domain instead of a temporary preview URL.',
      ],
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-[#fbf9f5] border border-stone-300 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-start justify-between border-b border-stone-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-mono text-stone-600 mb-1">
              <Globe className="w-3.5 h-3.5" />
              <span>Production Deployment Guide</span>
            </div>
            <h2 id="modal-title" className="font-serif text-2xl font-bold text-stone-900">
              Deploy The Growth Desk to GitHub & Vercel
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-stone-600 leading-relaxed">
          This codebase is 100% complete and self-contained with zero required external paid API keys. Follow these four quick steps to deploy it live with your custom domain and production canonical SEO.
        </p>

        <div className="space-y-6">
          {steps.map((step, idx) => (
            <div key={step.title} className="bg-white border border-stone-200 rounded-xl p-4 sm:p-5 space-y-2.5">
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-stone-900 text-stone-50 text-[11px] font-mono flex items-center justify-center">
                  {idx + 1}
                </span>
                <span>{step.title}</span>
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">{step.desc}</p>

              {step.command && (
                <div className="relative mt-2">
                  <pre className="bg-stone-900 text-stone-100 p-3.5 rounded-lg text-xs font-mono overflow-x-auto whitespace-pre leading-relaxed">
                    <code>{step.command}</code>
                  </pre>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(step.command!, idx)}
                    className="absolute top-2 right-2 p-1.5 rounded bg-stone-800 text-stone-300 hover:text-white transition-colors"
                    title="Copy command"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              )}

              {step.notes && (
                <ul className="list-disc list-inside text-xs text-stone-600 space-y-1 pt-1">
                  {step.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500 font-mono">
            Vercel rewrites: /vercel.json ready
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
          >
            Got It, Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
