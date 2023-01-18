import createCache from '@emotion/cache';
import { PaletteMode } from '@mui/material';
import Constant from '@utils/constant';

type DefaultStyle = {
  primaryClor: string;
  container: any;
  main: any;
  btnStyle: (color?: string) => any;
};

export const DEFAULT_STYLE: DefaultStyle = {
  primaryClor: '#fe6347',
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 1280,
    margin: 'auto',
  },
  main: {
    marginTop: 100,
  },
  btnStyle: (color: string = DEFAULT_STYLE.primaryClor) => ({
    borderColor: color,
    background: color,

    '&:hover': {
      borderColor: color,
      background: color,
      opacity: 0.7,
    },
  }),
};

// Create a theme instance.
// const theme = createTheme({

// });
export const getThemeConfig = (mode: PaletteMode) => ({
  mode,
  palette: {
    common: {
      black: mode === Constant.theme.LIGHT ? '#19192B' : '#ffffff',
      white: mode === Constant.theme.LIGHT ? '#ffffff' : '#19192B',
    },
    primary: {
      light: '#B3E5FC',
      main: '#1976d2',
      dark: '#0288D1',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#607D8B', // omitting light and dark will calculate from main
      contrastText: '#757575',
    },
    grey: {
      '500': '#bcbcbc',
      '700': '#79797a',
    },
    info: {
      main: '#1bb2f1',
    },
    success: {
      main: '#00d589',
    },
    error: {
      main: '#ff4263',
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          h4: 'h4',
          h5: 'h5',
          h6: 'h6',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'p',
          body2: 'span',
        },
      },
    },
  },
});

export function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}

// export default theme;
