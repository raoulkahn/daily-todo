import { createContext, useContext, useState, useLayoutEffect, useCallback } from 'react';
import { THEMES, DEFAULT_THEME_ID, getThemeById } from '../themes';

const ThemeContext = createContext();

const STORAGE_KEY = 'daily-todo-theme';

function applyThemeVars(theme) {
  const root = document.documentElement;
  for (const [key, value] of Object.entries(theme.vars)) {
    root.style.setProperty(key, value);
  }
}

function readStoredThemeId() {
  try {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME_ID;
  } catch {
    return DEFAULT_THEME_ID;
  }
}

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(readStoredThemeId);

  useLayoutEffect(() => {
    const theme = getThemeById(themeId);
    applyThemeVars(theme);
  }, [themeId]);

  const setTheme = useCallback((id) => {
    setThemeId(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // quota exceeded — ignore
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ themeId, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
