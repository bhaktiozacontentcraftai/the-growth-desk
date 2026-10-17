import React from 'react';
import { Link } from '../utils/router';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumbs" className="py-2">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500">
        <li>
          <Link href="/" className="hover:text-stone-900 transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={item.path}>
              <li aria-hidden="true" className="text-stone-400 select-none">
                /
              </li>
              <li>
                {isLast ? (
                  <span
                    className="text-stone-800 font-medium truncate max-w-[240px] sm:max-w-md inline-block align-bottom"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.path} className="hover:text-stone-900 transition-colors">
                    {item.name}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
