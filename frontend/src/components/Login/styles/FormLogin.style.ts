import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DEFAULT_STYLE } from '@styles/theme';

export const formLoginStyles = makeStyles((theme: Theme) => ({
  linkForgotPass: { textAlign: 'center', display: 'block', marginTop: theme.spacing(3), color: '#383E93' },
  btnLogin: { width: '100%', marginTop: theme.spacing(3), marginBottom: theme.spacing(1), ...DEFAULT_STYLE.btnStyle() },
  btnRegister: { width: 'max-content', margin: '10px auto' },
}));
