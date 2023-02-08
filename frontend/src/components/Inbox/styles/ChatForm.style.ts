import { Theme } from '@mui/material';
import { CSSProperties, makeStyles } from '@mui/styles';
import { DEFAULT_STYLE } from '@styles/theme';

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
    borderRadius: theme.spacing(3),
    ...DEFAULT_STYLE.btnStyle(),
    width: 100,
    '& svg.MuiSvgIcon-root': {
      fontSize: 14,
    } as CSSProperties,
  },
}));
