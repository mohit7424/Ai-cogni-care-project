'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
});

function applyThemeToDom(newTheme: Theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const body = document.body;

  if (newTheme === 'dark') {
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
    if (body) {
      body.classList.add('dark');
      body.setAttribute('data-theme', 'dark');
    }
  } else {
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
    if (body) {
      body.classList.remove('dark');
      body.setAttribute('data-theme', 'light');
    }
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    // By default, light mode is active unless user explicitly saved 'dark' in localStorage
    const saved = localStorage.getItem('cogni-theme') as Theme | null;
    let preferred: Theme = 'light';
    if (saved === 'dark' || saved === 'light') {
      preferred = saved;
    }

    if (preferred === 'dark') {
      queueMicrotask(() => {
        setThemeState('dark');
        applyThemeToDom('dark');
      });
    } else {
      applyThemeToDom('light');
    }
  }, []);

  function setTheme(newTheme: Theme) {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cogni-theme', newTheme);
    }
    applyThemeToDom(newTheme);
  }

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
