import { useState, useEffect, useCallback } from 'react';

export type Theme = 'light' | 'dark';

const THEME_CHANGE_EVENT = 'theme-change';

const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  window.dispatchEvent(new CustomEvent<Theme>(THEME_CHANGE_EVENT, { detail: theme }));
};

const getStoredTheme = (): Theme =>
  (localStorage.getItem('theme') as Theme) ?? 'light';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);

  useEffect(() => {
    const handler = (e: CustomEvent<Theme>) => setTheme(e.detail);
    window.addEventListener(THEME_CHANGE_EVENT, handler as EventListener);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, handler as EventListener);
  }, []);

  const changeTheme = useCallback((next: Theme) => {
    applyTheme(next);
  }, []);

  const toggleTheme = useCallback(() => {
    applyTheme(getStoredTheme() === 'dark' ? 'light' : 'dark');
  }, []);

  return { theme, changeTheme, toggleTheme };
};
