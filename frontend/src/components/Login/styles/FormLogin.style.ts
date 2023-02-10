import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const formLoginStyles = makeStyles((theme: Theme) => ({
  btnLogin: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  linkWrap: { textAlign: 'center', display: 'block', marginTop: theme.spacing(2), color: '#383E93' },
}));
