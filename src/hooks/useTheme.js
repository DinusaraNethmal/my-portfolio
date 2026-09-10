import { useState, useEffect } from 'react';

/**
 * Custom hook for dark/light theme management.
 * Persists preference in localStorage.
 * Adds/removes 'dark' class on <html> element.
 */
export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('dn-theme-preference');
    const initial = saved === 'dark' || saved === 'light' ? saved : 'light';
    const root = document.documentElement;
    if (initial === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    return initial;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('dn-theme-preference', theme);
    localStorage.setItem('dn-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  return { theme, toggleTheme };
};
