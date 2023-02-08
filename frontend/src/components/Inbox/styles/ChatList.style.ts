import { Theme } from '@mui/material';
import { CSSProperties, makeStyles } from '@mui/styles';

export const chatListStyles = makeStyles((theme: Theme) => ({
  listWrap: {
    padding: 0,
    width: '100%',
    maxWidth: 360,
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    } as CSSProperties,
  },
  chatItemWrap: {
    padding: `${theme.spacing(1)} ${theme.spacing(1)}`,
    borderRadius: theme.spacing(1),
    width: '100%',
    '&.active': {
      background: 'white',
    } as CSSProperties,
  },
  chipNotReply: {
    height: 20,
    fontSize: 12,
    '& .MuiChip-label': {
      padding: theme.spacing(1),
    },
  },
}));
