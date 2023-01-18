import { SxProps, Theme } from '@mui/material';
import { DEFAULT_STYLE } from '@styles/theme';

type PropertyNames = 'btnLoginNow' | 'btnRegister';

export const styleFormRegister: Record<PropertyNames, SxProps<Theme>> = {
  btnLoginNow: { width: '45%', margin: '10px auto' },
  btnRegister: { width: '100%', mt: 3, mb: 1, ...DEFAULT_STYLE.btnStyle('#fe6347') },
};
