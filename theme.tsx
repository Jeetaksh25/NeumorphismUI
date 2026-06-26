'use client';

import { createContext, useContext, useEffect } from 'react';
import { Theme, ThemeOverride, defaultTheme, darkTheme } from './theme-colors';

export type { Theme, ThemeOverride } from './theme-colors';

export type Status = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type Size = 'sm' | 'md' | 'lg';
export type Variant = 'raised' | 'pressed';

export const statusColorMap: Record<Status, keyof Theme> = {
  default: 'textPrimary',
  primary: 'accent',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info',
};

export interface ThemedProps {
  theme?: ThemeOverride;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
}

export interface BaseInputProps extends ThemedProps {
  label?: string;
  labelStyle?: React.CSSProperties;
  labelClassName?: string;
  error?: string;
  errorStyle?: React.CSSProperties;
  errorClassName?: string;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  helperClassName?: string;
  helperStyle?: React.CSSProperties;
}

export interface IconProps {
  icon?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const ThemeContext = createContext<Theme | null>(null);

function applyThemeVars(theme: Theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--bg', theme.bgColor);
  root.style.setProperty('--text-primary', theme.textPrimary);
  root.style.setProperty('--text-secondary', theme.textSecondary);
  root.style.setProperty('--accent', theme.accent);
  root.style.setProperty('--accent-light', theme.accentLight);
  root.style.setProperty('--shadow-light', theme.shadowLight);
  root.style.setProperty('--shadow-dark', theme.shadowDark);
  root.style.setProperty('--success', theme.success);
  root.style.setProperty('--warning', theme.warning);
  root.style.setProperty('--danger', theme.danger);
  root.style.setProperty('--info', theme.info);
}

export function ThemeProvider({ theme, children }: { theme: Theme; children: React.ReactNode }) {
  useEffect(() => {
    applyThemeVars(theme);
    if (typeof document !== 'undefined') {
      document.body.style.backgroundColor = theme.bgColor;
    }
  }, [theme]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return darkTheme;
    }
    return defaultTheme;
  }
  return ctx;
}

export function resolveTheme(themeOverride?: ThemeOverride): Theme {
  const activeTheme = useTheme();
  return { ...activeTheme, ...(themeOverride ?? {}) };
}
