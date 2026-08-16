import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

/**
 * NOVA 2 · Theme provider (TA-04).
 * Manages light / dark modes by toggling the `dark` class on <html>, which
 * re-resolves the `--ds-*` semantic custom properties defined in
 * `src/index.css`. Persists the choice to localStorage and falls back to
 * the OS `prefers-color-scheme`.
 */

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'nova-theme'

const THEME_SEQUENCE: Theme[] = ['light', 'dark']

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  cycle: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function resolveInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(resolveInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: setThemeState,
      cycle: () =>
        setThemeState(prev => THEME_SEQUENCE[(THEME_SEQUENCE.indexOf(prev) + 1) % THEME_SEQUENCE.length]),
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}