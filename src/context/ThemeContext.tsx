import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    localStorage.setItem('leadnest_theme', 'light');
    const root = document.documentElement;
    root.classList.add('light');
    root.classList.remove('dark');
    document.body.classList.add('light');
    document.body.classList.remove('dark');
    document.body.style.backgroundColor = '#FFFFFF';
    document.body.style.color = '#0F172A';
  }, [theme]);

  const toggleTheme = () => {
    // Keep consistent pure white theme as requested by user
    setThemeState('light');
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
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
