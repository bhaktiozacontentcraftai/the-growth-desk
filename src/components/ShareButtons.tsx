import React, { useState } from 'react';
import { Share2, Link2, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'X (Twitter)',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
  ];

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch {
        // User cancelled or share failed
      }
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 mr-1">
        Share:
      </span>

      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-stone-700 bg-white border border-stone-200 px-3 py-1.5 rounded hover:border-stone-400 hover:text-stone-900 transition-colors"
        >
          {link.name}
        </a>
      ))}

      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-200 px-3 py-1.5 rounded hover:border-stone-400 hover:text-stone-900 transition-colors"
        title="Copy article link to clipboard"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700 font-semibold">Copied!</span>
          </>
        ) : (
          <>
            <Link2 className="w-3.5 h-3.5 text-stone-500" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
        <button
          type="button"
          onClick={handleNativeShare}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-200 px-3 py-1.5 rounded hover:border-stone-400 hover:text-stone-900 transition-colors"
          title="Share using native device menu"
        >
          <Share2 className="w-3.5 h-3.5 text-stone-500" />
          <span>Device Share</span>
        </button>
      )}
    </div>
  );
};
