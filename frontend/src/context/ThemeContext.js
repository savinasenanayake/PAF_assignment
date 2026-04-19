import React, { createContext, useContext, useState, useEffect } from 'react';
import { getThemeMode, toggleTheme } from '../utils/theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Initialize theme on mount
    const mode = getThemeMode();
    setIsDark(mode === 'dark');
  }, []);

  const handleToggleTheme = () => {
    const newMode = toggleTheme();
    setIsDark(newMode === 'dark');
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme: handleToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
