import { Theme } from '@mui/material';
import { CSSProperties, makeStyles } from '@mui/styles';
import { DEFAULT_STYLE } from '@styles/theme';

export const forgotPasswordStyles = makeStyles((theme: Theme) => ({
  mainContentLeft: {
    top: 0,
    left: 0,
    padding: 2,
    [theme.breakpoints.up('md')]: {
      minHeight: '100vh',
      width: '45%',
      position: 'fixed',
    } as CSSProperties,
    [theme.breakpoints.up('xs')]: {
      minHeight: '50vh',
      width: '100%',
      position: 'relative',
    } as CSSProperties,
  },
  titleApp: {
    fontWeight: 700,
    fontSize: 70,
  },
  description_1: {
    marginTop: theme.spacing(2),
    fontWeight: 400,
    fontSize: 20,
  },
  description_2: {
    marginTop: theme.spacing(1),
    fontWeight: 500,
    fontSize: 25,
  },
  mainContentRight: {
    minHeight: '100vh',
    [theme.breakpoints.up('md')]: {
      width: '55%',
    } as CSSProperties,
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    } as CSSProperties,
  },
  boxContentRight: {
    borderRadius: theme.spacing(1),
    width: '100%',
    padding: theme.spacing(2),
    boxShadow: '0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)',
    [theme.breakpoints.up('md')]: {
      maxWidth: '450px',
    } as CSSProperties,
    [theme.breakpoints.up('xs')]: {
      maxWidth: '400px',
    } as CSSProperties,
  },
  titleContentRight: { fontWeight: 700, fontSize: 24, marginBottom: theme.spacing(1) },
  btnLogin: { width: '100%', marginTop: theme.spacing(3), marginBottom: theme.spacing(1), ...DEFAULT_STYLE.btnStyle() },
}));
