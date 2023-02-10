import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DEFAULT_STYLE } from '@styles/theme';

export const formForgotPasswordStyles = makeStyles((theme: Theme) => ({
  btnSearch: {
    width: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    borderRadius: theme.spacing(3),
    ...DEFAULT_STYLE.btnStyle(),
  },
  linkWrap: { textAlign: 'center', display: 'block', marginTop: theme.spacing(3), color: '#383E93' },
}));
