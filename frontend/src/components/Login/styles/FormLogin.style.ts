import { SxProps, Theme } from '@mui/material';
import { DEFAULT_STYLE } from '@styles/theme';

type PropertyNames = 'linkForgotPass' | 'btnLogin' | 'btnRegister';

export const styleFormLogin: Record<PropertyNames, SxProps<Theme>> = {
  linkForgotPass: { textAlign: 'center', display: 'block', mt: 3, color: '#383E93' },
  btnLogin: { width: '100%', mt: 3, mb: 1, ...DEFAULT_STYLE.btnStyle() },
  btnRegister: { width: '45%', margin: '10px auto' },
};
