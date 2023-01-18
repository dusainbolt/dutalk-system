import {
  forgotPasswordStart,
  loginStart,
  logoutStart,
  registerStart,
  resetPasswordOtpStart,
  verifyOtpRegisterStart,
} from '@redux/slices/authSlice';
import { useAppDispatch } from '@redux/store';
import { InputForgotPassword, InputLogin, InputOtpRegister, InputRegister, InputResetPasswordOtp } from '@type/auth';

export interface UseAuth {
  onSubmitRegister: (values: InputRegister) => void;
  onSubmitOtp: (values: InputOtpRegister) => void;
  onSubmitLogin: (values: InputLogin) => void;
  onSubmitForgotPassword: (values: InputForgotPassword) => void;
  onSubmitResetPasswordOtp: (values: InputResetPasswordOtp) => void;
  onLogout: () => void;
}

function useAuth(): UseAuth {
  const dispatch = useAppDispatch();

  const onSubmitOtp = (values: InputOtpRegister) => {
    dispatch(verifyOtpRegisterStart(values));
  };

  const onSubmitRegister = (values: InputRegister) => {
    dispatch(registerStart(values));
  };

  const onSubmitLogin = (values: InputLogin) => {
    dispatch(loginStart(values));
  };

  const onSubmitForgotPassword = (values: InputForgotPassword) => {
    dispatch(forgotPasswordStart(values));
  };

  const onSubmitResetPasswordOtp = (values: InputResetPasswordOtp) => {
    dispatch(resetPasswordOtpStart(values));
  };

  const onLogout = () => {
    dispatch(logoutStart());
  };

  return { onSubmitRegister, onSubmitOtp, onSubmitLogin, onSubmitForgotPassword, onSubmitResetPasswordOtp, onLogout };
}

export default useAuth;
