import { AppError } from './context';

export enum StepRegister {
  INPUT_DATA,
  INPUT_OTP,
  VERIFY_COMPLETED,
}

export enum StepLogin {
  INPUT_DATA,
  INPUT_OTP,
  LOGIN_SUCCESS,
}

export enum StepForgotPassword {
  INPUT_DATA,
  INPUT_OTP_AND_PASSWORD,
  RESET_PASSWORD_SUCCESS,
}

export type InputRegister = {
  username: string;
  password: string;
  rePassword: string;
  fullName: string;
  email: string;
};

export type InputOtpRegister = {
  otp: string;
  credential: string;
};

export type InputLogin = {
  credential: string;
  password: string;
};

export type InputForgotPassword = {
  credential: string;
};

export type InputResetPasswordOtp = {
  credential: string;
  otp: string;
  password: string;
  rePassword: string;
};

export type AuthSignInDto = InputLogin;

export type AuthVerifyAccountDto = InputOtpRegister;

export type AuthSignUpDto = Omit<InputRegister, 'rePassword'>;

export type AuthSignInSuccessDto = { token: string };

export type AuthVerifyAccountSuccessDto = AuthSignInSuccessDto;

export type AuthForgotPasswordSuccessDto = { result: string };

export type AuthResetPasswordOtpSuccessDto = AuthForgotPasswordSuccessDto;

export type AuthForgotPasswordDto = InputForgotPassword;

export type AuthResetPasswordOtpDto = Omit<InputResetPasswordOtp, 'rePassword'>;

export type AuthSlice = {
  // state logic
  loadingLogin?: boolean;
  loadingRegister?: boolean;
  loadingVerifyRegister?: boolean;
  loadingForgotPassword?: boolean;
  loadingResetPasswordOtp?: boolean;
  loadingLogout?: boolean;
  errorLogin?: AppError;
  errorRegister?: AppError;
  errorVerifyRegister?: AppError;
  errorForgotPassword?: AppError;
  errorResetPasswordOtp?: AppError;
  stepRegister: StepRegister;
  stepLogin: StepLogin;
  stepForgotPassword: StepForgotPassword;
  // data
  credential?: string;
  token?: string;
};
