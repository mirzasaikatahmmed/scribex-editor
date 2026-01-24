'use client';

import { useEffect, createContext, useContext, useState, ReactNode } from 'react';
import { themeActions } from 'reactjs-tiptap-editor/theme';
import { localeActions } from 'reactjs-tiptap-editor/locale-bundle';

export type ThemeColor =
  | 'default'
  | 'red'
  | 'blue'
  | 'green'
  | 'orange'
  | 'rose'
  | 'violet'
  | 'yellow';

export type ThemeMode = 'light' | 'dark';

export type Locale = 'en' | 'vi' | 'zh_CN' | 'pt_BR' | 'hu_HU' | 'fi';

export interface ScribexThemeConfig {
  mode?: ThemeMode;
  color?: ThemeColor;
  borderRadius?: number;
  locale?: Locale;
}

interface ThemeContextValue extends ScribexThemeConfig {
  setMode: (mode: ThemeMode) => void;
  setColor: (color: ThemeColor) => void;
  setBorderRadius: (radius: number) => void;
  setLocale: (locale: Locale) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useScribexTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useScribexTheme must be used within a ScribexThemeProvider');
  }
  return context;
}

interface ScribexThemeProviderProps {
  children: ReactNode;
  defaultConfig?: ScribexThemeConfig;
}

export function ScribexThemeProvider({
  children,
  defaultConfig = {},
}: ScribexThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(defaultConfig.mode || 'light');
  const [color, setColorState] = useState<ThemeColor>(defaultConfig.color || 'default');
  const [borderRadius, setBorderRadiusState] = useState<number>(
    defaultConfig.borderRadius ?? 0.5
  );
  const [locale, setLocaleState] = useState<Locale>(defaultConfig.locale || 'en');

  useEffect(() => {
    themeActions.setTheme(mode);
  }, [mode]);

  useEffect(() => {
    themeActions.setColor(color);
  }, [color]);

  useEffect(() => {
    themeActions.setBorderRadius(`${borderRadius}rem`);
  }, [borderRadius]);

  useEffect(() => {
    localeActions.setLang(locale);
  }, [locale]);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    themeActions.setTheme(newMode);
  };

  const setColor = (newColor: ThemeColor) => {
    setColorState(newColor);
    themeActions.setColor(newColor);
  };

  const setBorderRadius = (newRadius: number) => {
    setBorderRadiusState(newRadius);
    themeActions.setBorderRadius(`${newRadius}rem`);
  };

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localeActions.setLang(newLocale);
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        color,
        borderRadius,
        locale,
        setMode,
        setColor,
        setBorderRadius,
        setLocale,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ScribexThemeProvider;
