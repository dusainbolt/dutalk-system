import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DEFAULT_STYLE } from '@styles/theme';

export const formRegisterStyles = makeStyles((theme: Theme) => ({
  btnRegister: {
    width: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    ...DEFAULT_STYLE.btnStyle('#383E93'),
  },
  btnLoginNow: { width: '45%', margin: '10px auto' },
}));
