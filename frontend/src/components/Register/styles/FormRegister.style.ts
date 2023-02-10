import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const formRegisterStyles = makeStyles((theme: Theme) => ({
  btnRegister: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  boxTextBottom: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    fontSize: 14,
  },
  linkWrap: { textAlign: 'center', display: 'block', marginTop: theme.spacing(2), color: '#383E93' },
}));
