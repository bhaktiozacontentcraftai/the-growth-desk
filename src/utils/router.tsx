import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface RouterContextType {
  currentPath: string;
  navigate: (path: string, options?: { replace?: boolean; scrollToTop?: boolean }) => void;
}

const RouterContext = createContext<RouterContextType>({
  currentPath: '/',
  navigate: () => {},
});

export const useRouter = () => useContext(RouterContext);

export const normalizePath = (path: string): string => {
  if (!path) return '/';
  // Remove hash or query if present for route matching
  const [clean] = path.split('#')[0].split('?');
  let normalized = clean.trim();
  if (!normalized.startsWith('/')) {
    normalized = '/' + normalized;
  }
  // Ensure trailing slash for directory routes
  if (normalized !== '/' && !normalized.endsWith('/')) {
    normalized = normalized + '/';
  }
  return normalized;
};

interface RouterProviderProps {
  children: ReactNode;
}

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return normalizePath(window.location.pathname);
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string, options?: { replace?: boolean; scrollToTop?: boolean }) => {
    if (typeof window === 'undefined') return;

    // Check if it's a hash anchor on the same page
    if (path.startsWith('#')) {
      const element = document.getElementById(path.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', path);
      }
      return;
    }

    const normalized = normalizePath(path);

    if (options?.replace) {
      window.history.replaceState(null, '', normalized);
    } else {
      window.history.pushState(null, '', normalized);
    }

    setCurrentPath(normalized);

    if (options?.scrollToTop !== false) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
  children: ReactNode;
  replace?: boolean;
}

export const Link: React.FC<LinkProps> = ({ href, className, children, replace, onClick, ...rest }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);

    // Allow standard browser handling for modifiers or external links
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return;
    }

    e.preventDefault();
    navigate(href, { replace });
  };

  return (
    <a href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};
