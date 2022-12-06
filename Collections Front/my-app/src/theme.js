import { createTheme } from '@mui/material';

export const lighTheme = createTheme({
  palette: {
    primary: {
      main: '#DCD7C9',
    },
    secondary: {
      main: '#e7d111',
    },
    info: {
      main: '#2b494d',
    },
    success: {
      main: '#1a373c',
    },
  },

  typography: {
    fontFamily: ['Quicksand', 'sans-serif'].join(','),
    second: {
      fontFamily: 'Source Sans Pro',
      fontSize: '1.2em',
    },
  },
});
