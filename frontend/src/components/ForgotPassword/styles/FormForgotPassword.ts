import { SxProps, Theme } from '@mui/material';
import { DEFAULT_STYLE } from '@styles/theme';

type PropertyNames = 'linkHome' | 'btnSearch' | 'btnLogin';

export const styleFormForgotPassword: Record<PropertyNames, SxProps<Theme>> = {
  linkHome: { textAlign: 'center', display: 'block', mt: 3, color: '#383E93' },
  btnSearch: { width: '100%', mt: 3, mb: 1, ...DEFAULT_STYLE.btnStyle() },
  btnLogin: { width: '45%', margin: '10px auto' },
};
