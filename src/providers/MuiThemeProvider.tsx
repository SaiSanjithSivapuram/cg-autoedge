'use client';

import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import NextLink from 'next/link';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1A2440',
      dark: '#080C14',
      light: '#243356',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#EF4444',
      dark: '#DC2626',
      light: '#F87171',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0D1117',
      paper: '#1A2440',
    },
    text: {
      primary: '#F1F5F9',
      secondary: '#94A3B8',
    },
    divider: 'rgba(255,255,255,0.1)',
  },
  typography: {
    fontFamily: 'var(--font-source-sans), "Source Sans 3", sans-serif',
    h1: { fontFamily: 'var(--font-lexend), "Lexend", sans-serif', lineHeight: 1.15 },
    h2: { fontFamily: 'var(--font-lexend), "Lexend", sans-serif', lineHeight: 1.2 },
    h3: { fontFamily: 'var(--font-lexend), "Lexend", sans-serif', lineHeight: 1.25 },
    h4: { fontFamily: 'var(--font-lexend), "Lexend", sans-serif', lineHeight: 1.3 },
    h5: { fontFamily: 'var(--font-lexend), "Lexend", sans-serif', lineHeight: 1.35 },
    h6: { fontFamily: 'var(--font-lexend), "Lexend", sans-serif', lineHeight: 1.4 },
    body1: { lineHeight: 1.7, fontSize: '1rem' },
    body2: { lineHeight: 1.65, fontSize: '0.9375rem' },
    fontSize: 16,
  },
  shape: {
    borderRadius: 10,
  },
  shadows: [
    'none',
    '0 1px 4px rgba(0,0,0,0.30)',
    '0 2px 8px rgba(0,0,0,0.34)',
    '0 4px 16px rgba(0,0,0,0.36)',
    '0 8px 24px rgba(0,0,0,0.38)',
    '0 12px 32px rgba(0,0,0,0.40)',
    '0 16px 40px rgba(0,0,0,0.42)',
    '0 20px 48px rgba(0,0,0,0.44)',
    '0 24px 56px rgba(0,0,0,0.46)',
    '0 28px 64px rgba(0,0,0,0.48)',
    '0 32px 72px rgba(0,0,0,0.50)',
    '0 36px 80px rgba(0,0,0,0.52)',
    '0 40px 88px rgba(0,0,0,0.54)',
    '0 44px 96px rgba(0,0,0,0.56)',
    '0 48px 104px rgba(0,0,0,0.58)',
    '0 52px 112px rgba(0,0,0,0.60)',
    '0 56px 120px rgba(0,0,0,0.62)',
    '0 60px 128px rgba(0,0,0,0.64)',
    '0 64px 136px rgba(0,0,0,0.66)',
    '0 68px 144px rgba(0,0,0,0.68)',
    '0 72px 152px rgba(0,0,0,0.70)',
    '0 76px 160px rgba(0,0,0,0.72)',
    '0 80px 168px rgba(0,0,0,0.74)',
    '0 84px 176px rgba(0,0,0,0.76)',
    '0 88px 184px rgba(0,0,0,0.78)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
          html { scroll-behavior: auto; }
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: 'var(--font-lexend), "Lexend", sans-serif',
          fontWeight: 600,
          borderRadius: 8,
          cursor: 'pointer',
        },
        sizeLarge: {
          paddingTop: '14px',
          paddingBottom: '14px',
          paddingLeft: '32px',
          paddingRight: '32px',
          fontSize: '1rem',
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined', fullWidth: true },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#EF4444',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#EF4444',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#EF4444',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': { color: '#EF4444' },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '10px !important',
          boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
          marginBottom: '12px',
          '&:before': { display: 'none' },
          '&.Mui-expanded': { marginBottom: '12px' },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          fontFamily: 'var(--font-lexend), "Lexend", sans-serif',
          fontWeight: 600,
          fontSize: '1rem',
          color: '#F1F5F9',
          padding: '4px 24px',
          minHeight: 64,
          '&.Mui-expanded': { minHeight: 64 },
        },
        content: {
          margin: '16px 0',
          '&.Mui-expanded': { margin: '16px 0' },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '0 24px 20px',
          color: '#94A3B8',
          lineHeight: 1.7,
          fontSize: '0.9375rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
        },
      },
    },
    MuiLink: {
      defaultProps: { component: NextLink, underline: 'hover' },
    },
    MuiButtonBase: {
      defaultProps: { LinkComponent: NextLink },
    },
  },
});

export default function MuiThemeProvider({ children }: { children: React.ReactNode }) {
  const [{ cache, flush }] = useState(() => {
    const c = createCache({ key: 'mui' });
    c.compat = true;
    const prevInsert = c.insert.bind(c);
    let inserted: string[] = [];
    c.insert = (...args: Parameters<typeof prevInsert>) => {
      const serialized = args[1];
      if (c.inserted[serialized.name] === undefined) inserted.push(serialized.name);
      return prevInsert(...args);
    };
    const flush = () => {
      const prev = inserted;
      inserted = [];
      return prev;
    };
    return { cache: c, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;
    let styles = '';
    for (const name of names) styles += cache.inserted[name];
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
