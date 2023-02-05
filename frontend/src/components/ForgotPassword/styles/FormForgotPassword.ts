import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DEFAULT_STYLE } from '@styles/theme';

export const formForgotPasswordStyles = makeStyles((theme: Theme) => ({
  linkHome: { textAlign: 'center', display: 'block', marginTop: theme.spacing(3), color: '#383E93' },
  btnSearch: {
    width: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    ...DEFAULT_STYLE.btnStyle(),
  },
  btnLogin: { width: '45%', margin: '10px auto' },
}));
