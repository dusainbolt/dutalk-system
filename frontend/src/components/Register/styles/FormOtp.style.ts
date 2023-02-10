import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DEFAULT_STYLE } from '@styles/theme';

export const formRegisterOtpStyles = makeStyles((theme: Theme) => ({
  boxOtp: {
    '& .otp-register-input': {
      ...DEFAULT_STYLE.otpStyle(),
    },
  },
  btnConfirm: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  description_1: {
    marginBottom: theme.spacing(2),
    fontSize: 14,
  },
}));
