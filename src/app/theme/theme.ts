import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0f766e',
      light: '#14b8a6',
      dark: '#0d5a52',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#64748b',
      light: '#94a3b8',
      dark: '#475569',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    error: {
      main: '#ef4444',
      light: '#fca5a5',
      dark: '#dc2626',
    },
    warning: {
      main: '#f59e0b',
      light: '#fcd34d',
      dark: '#d97706',
    },
    info: {
      main: '#06b6d4',
      light: '#67e8f9',
      dark: '#0891b2',
    },
    success: {
      main: '#10b981',
      light: '#6ee7b7',
      dark: '#059669',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
      disabled: '#cbd5e1',
    },
    divider: '#e2e8f0',
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: { fontWeight: 700, fontSize: '2.4rem', letterSpacing: '-0.01562em' },
    h2: { fontWeight: 700, fontSize: '1.9rem', letterSpacing: '-0.00833em' },
    h3: { fontWeight: 600, fontSize: '1.4rem' },
    h4: { fontWeight: 600, fontSize: '1.2rem' },
    h5: { fontWeight: 500, fontSize: '1.05rem' },
    h6: { fontWeight: 500, fontSize: '0.95rem' },
    subtitle1: { fontWeight: 400, fontSize: '0.95rem' },
    subtitle2: { fontWeight: 400, fontSize: '0.85rem' },
    body1: { fontWeight: 400, fontSize: '0.95rem' },
    body2: { fontWeight: 400, fontSize: '0.85rem' },
    button: { fontWeight: 500, textTransform: 'none', letterSpacing: '0.03em' },
    caption: { fontWeight: 400, fontSize: '0.75rem' },
    overline: { fontWeight: 400, fontSize: '0.7rem', letterSpacing: '0.1em' },
  },
  shape: {
    borderRadius: 10,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          background: '#f1f3f6',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          fontSize: '1rem',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
      },
    },
  },
});
