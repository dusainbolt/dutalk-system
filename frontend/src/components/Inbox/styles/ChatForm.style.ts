import { Theme } from '@mui/material';
import { CSSProperties, makeStyles } from '@mui/styles';

export const chatFormStyle = makeStyles((theme: Theme) => ({
  inputMessage: {
    borderRadius: theme.spacing(3),
    overflow: 'hidden',
    '& .MuiInputBase-root': {
      background: '#EFF2F6',
    } as CSSProperties,
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    } as CSSProperties,
  },
  btnSend: {
    width: 100,
    '& svg.MuiSvgIcon-root': {
      fontSize: 14,
    } as CSSProperties,
  },
}));
