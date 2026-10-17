import React, { useEffect, useState } from 'react';
import { TableOfContentsItem } from '../types/blog';
import { ListFilter } from 'lucide-react';

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  useEffect(() => {
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0px 0px -65% 0px',
        threshold: 0.1,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveId(id);
      setIsOpenMobile(false);
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  if (!items.length) return null;

  return (
    <nav
      className="bg-stone-100/70 border border-stone-200/90 rounded-xl p-5"
      aria-label="Table of Contents"
    >
      <div className="flex items-center justify-between mb-3.5">
        <h2 className="text-xs font-semibold tracking-wider uppercase text-stone-900 flex items-center gap-1.5">
          <ListFilter className="w-3.5 h-3.5" />
          <span>In This Guide</span>
        </h2>
        <button
          type="button"
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="lg:hidden text-xs text-stone-600 underline font-medium"
        >
          {isOpenMobile ? 'Collapse' : 'Expand'}
        </button>
      </div>

      <ul className={`space-y-2 text-xs leading-normal ${isOpenMobile ? 'block' : 'hidden lg:block'}`}>
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              className={`${item.level === 3 ? 'pl-3 border-l border-stone-200' : ''}`}
            >
              <button
                type="button"
                onClick={() => handleScroll(item.id)}
                className={`text-left w-full transition-colors ${
                  isActive
                    ? 'font-semibold text-stone-950 underline underline-offset-2'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {item.title}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
