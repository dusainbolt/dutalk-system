import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DEFAULT_STYLE } from '@styles/theme';

export const formRegisterOtpStyles = makeStyles((theme: Theme) => ({
  boxOtp: {
    '& .otp-register-input': {
      width: '95% !important',
      height: '45px',
      borderRadius: theme.spacing(1),
      border: 0,
      background: '#dddddd',
      fontSize: 20,
    },
  },
  btnConfirm: {
    width: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    ...DEFAULT_STYLE.btnStyle('#383E93'),
  },
  description_1: {
    padding: theme.spacing(1),
    background: '#a0d4967a',
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));
