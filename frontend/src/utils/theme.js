/**
 * Theme utility functions for managing dark mode
 */

const THEME_STORAGE_KEY = 'paf-theme-mode';

/**
 * Get the current theme mode
 * @returns {string} 'dark' or 'light'
 */
export const getThemeMode = () => {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored) return stored;

  // Check system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
};

/**
 * Set the theme mode
 * @param {string} mode - 'dark' or 'light'
 */
export const setThemeMode = (mode) => {
  localStorage.setItem(THEME_STORAGE_KEY, mode);
  applyTheme(mode);
};

/**
 * Toggle between dark and light mode
 * @returns {string} The new theme mode
 */
export const toggleTheme = () => {
  const current = getThemeMode();
  const newMode = current === 'dark' ? 'light' : 'dark';
  setThemeMode(newMode);
  return newMode;
};

/**
 * Apply theme by adding/removing class on document root
 * @param {string} mode - 'dark' or 'light'
 */
export const applyTheme = (mode) => {
  const html = document.documentElement;
  if (mode === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
};

/**
 * Initialize theme on app start
 */
export const initializeTheme = () => {
  const mode = getThemeMode();
  applyTheme(mode);
  return mode;
};
