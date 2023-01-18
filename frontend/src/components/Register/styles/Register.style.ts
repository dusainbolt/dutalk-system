import { SxProps, Theme } from '@mui/material';
import { DEFAULT_STYLE } from '@styles/theme';

type PropertyNames =
  | 'mainContentLeft'
  | 'titleApp'
  | 'description_1'
  | 'description_2'
  | 'mainContentRight'
  | 'boxContentRight'
  | 'titleContentRight'
  | 'btnLoginNow_2';

export const styleRegister: Record<PropertyNames, SxProps<Theme>> = {
  mainContentLeft: {
    minHeight: { md: '100vh', xs: '50vh' },
    width: { xs: '100%', md: '45%' },
    backgroundImage: `url('/images/background-login.png')`,
    position: { xs: 'relative', md: 'fixed' },
    top: 0,
    left: 0,
    padding: 2,
  },
  titleApp: {
    fontWeight: 700,
    fontSize: 70,
  },
  description_1: {
    mt: 2,
    fontWeight: 400,
    fontSize: 20,
  },
  description_2: {
    mt: 1,
    fontWeight: 500,
    fontSize: 25,
  },
  mainContentRight: {
    width: { md: '55%', xs: '100%' },
    minHeight: '100vh',
  },
  boxContentRight: {
    maxWidth: { md: '450px', xs: '400px' },
    width: '100%',
    padding: 2,
    boxShadow: '0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)',
    borderRadius: 2,
  },
  titleContentRight: { fontWeight: 700, fontSize: 24, mb: 1 },
  btnLoginNow_2: {
    width: '45%',
    margin: '10px auto',
    display: 'block',
    textAlign: 'center',
    ...DEFAULT_STYLE.btnStyle('#fe6347'),
  },
};
