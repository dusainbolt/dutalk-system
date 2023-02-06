const Constant = {
  form: { UNKNOWN_LABEL: 'Unknown label', TYPE_TEXT: 'text', TYPE_PASSWORD: 'password' },
  date: {
    D_M_Y: 'DD/MM/YYYY',
    D_M_Y_H_M: 'DD/MM/YYYY HH:mm',
  },
  code: {
    ALREADY_PENDING_REQUEST: -32002,
    ERROR_AUTHENTICATION: 401,
    BAD_REQUEST: 400,
    ERROR_RESPONSE: 500,
    SUCCESS_RESPONSE: 200,
  },
  theme: {
    KEY: 'theme_mode',
    DARK: 'dark' as any,
    LIGHT: 'light' as any,
  },
  delayAPI: 500,
  delaySocket: 300,
  ADMIN_ID: 1,
};

export default Constant;
