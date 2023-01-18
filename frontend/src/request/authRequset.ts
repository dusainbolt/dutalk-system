import {
  AuthForgotPasswordDto,
  AuthResetPasswordOtpDto,
  AuthSignInDto,
  AuthSignUpDto,
  AuthVerifyAccountDto,
} from '@type/auth';
import axios from './axios';

export class AuthRequest {
  static signIn = async (body: AuthSignInDto) => {
    return await axios.post('/auth/sign-in', body);
  };

  static signUp = async (body: AuthSignUpDto) => {
    return await axios.post('/auth/sign-up', body);
  };

  static verifyAccount = async (body: AuthVerifyAccountDto) => {
    return await axios.post('/auth/verify-account', body);
  };

  static forgotPassword = async (body: AuthForgotPasswordDto) => {
    return await axios.post('/auth/forgot-password', body);
  };

  static resetPasswordOtp = async (body: AuthResetPasswordOtpDto) => {
    return await axios.post('/auth/reset-password-otp', body);
  };

  static logout = async () => {
    return await axios.post('/auth/sign-out', { token: 'write token here' });
  };
}
