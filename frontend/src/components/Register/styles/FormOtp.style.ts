import { SxProps, Theme } from '@mui/material';
import { DEFAULT_STYLE } from '@styles/theme';

type PropertyNames = 'boxOtp' | 'btnConfirm' | 'description_1';

export const styleFormOtp: Record<PropertyNames, SxProps<Theme>> = {
  boxOtp: {
    '& .otp-register-input': {
      width: '95% !important',
      height: '45px',
      borderRadius: 2,
      border: '0px',
      // marginLeft: '8px',
      // marginRight: '8px',
      background: '#dddddd',
      fontSize: '20px',
    },
  },
  btnConfirm: { width: '100%', mt: 3, mb: 1, ...DEFAULT_STYLE.btnStyle('#383E93') },
  description_1: {
    padding: 1,
    background: '#a0d4967a',
    borderRadius: 2,
    mb: 2,
  },
};
