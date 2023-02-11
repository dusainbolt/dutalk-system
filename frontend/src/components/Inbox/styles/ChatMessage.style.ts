import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const chatMessageStyles = makeStyles((theme: Theme) => ({
  wrapTime: {
    display: 'flex',
    justifyContent: 'center',
    float: 'left',
    width: '100%',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  timeText: {
    fontSize: 12,
  },
  wrapMessage: { width: '90%', marginBottom: theme.spacing(0.5), position: 'relative' },
  wrapMessageChild: {
    color: '#4A5056',
    padding: theme.spacing(1),
    fontSize: 15,
    borderRadius: theme.spacing(1),
    whiteSpace: 'pre-wrap',

    // display
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',
    wordBreak: 'break-word',
  },
}));
