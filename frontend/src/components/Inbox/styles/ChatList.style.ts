import { Theme } from '@mui/material';
import { CSSProperties, makeStyles } from '@mui/styles';
import { DEFAULT_STYLE } from '@styles/theme';

export const chatListStyles = makeStyles((theme: Theme) => ({
  listWrap: { padding: 0, width: '100%', maxWidth: 360 },
  chatItemWrap: {
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}`,
    borderRadius: theme.spacing(1),
    width: '100%',
    '&.active': {
      background: 'white',
    } as CSSProperties,
  },
}));