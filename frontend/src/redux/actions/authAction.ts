import { PayloadName } from '@redux/reducer';
import { Account } from '@type/account';
import {
  AuthForgotPasswordDto,
  AuthResetPasswordOtpDto,
  AuthResetPasswordOtpSuccessDto,
  AuthForgotPasswordSuccessDto,
  AuthSignInDto,
  AuthSignInSuccessDto,
  AuthSignUpDto,
  AuthVerifyAccountDto,
  AuthVerifyAccountSuccessDto,
} from '@type/auth';

export type LoginStartAction = Record<PayloadName, AuthSignInDto>;
export type RegisterStartAction = Record<PayloadName, AuthSignUpDto>;
export type RegisterSuccessAction = Record<PayloadName, Account>;
export type VerifyOtpRegisterStartAction = Record<PayloadName, AuthVerifyAccountDto>;
export type LoginSuccessAction = Record<PayloadName, AuthSignInSuccessDto>;
export type VerifyOtpRegisterSuccessAction = Record<PayloadName, AuthVerifyAccountSuccessDto>;
export type ForgotPasswordStartAction = Record<PayloadName, AuthForgotPasswordDto>;
export type ForgotPasswordSuccessAction = Record<PayloadName, AuthForgotPasswordSuccessDto>;
export type ResetPasswordOtpStartAction = Record<PayloadName, AuthResetPasswordOtpDto>;
export type ResetPasswordOtpSuccessAction = Record<PayloadName, AuthResetPasswordOtpSuccessDto>;
