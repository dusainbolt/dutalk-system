/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import {
  ForgotPasswordStartAction,
  ForgotPasswordSuccessAction,
  LoginStartAction,
  LoginSuccessAction,
  RegisterStartAction,
  RegisterSuccessAction,
  ResetPasswordOtpStartAction,
  ResetPasswordOtpSuccessAction,
  VerifyOtpRegisterStartAction,
  VerifyOtpRegisterSuccessAction,
} from '@redux/actions/authAction';
import { getPersistConfig } from '@redux/storage';
import { createAction, createSlice } from '@reduxjs/toolkit';
import { AuthSlice, StepForgotPassword, StepLogin, StepRegister } from '@type/auth';
import { ErrorAction } from '@type/context';
import { ErrCode } from '@utils/error';
import { HYDRATE } from 'next-redux-wrapper';
import { persistReducer } from 'redux-persist';
import { RootState } from '../reducer';
import { AppState } from '../store';

const initialState: AuthSlice = {
  stepRegister: StepRegister.INPUT_DATA,
  stepLogin: StepLogin.INPUT_DATA,
  stepForgotPassword: StepForgotPassword.INPUT_DATA,
};

const hydrate = createAction<AppState>(HYDRATE);

const sliceName = 'authSlice';

const authSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    // login dispatch
    loginStart: (state: AuthSlice, { payload }: LoginStartAction) => {
      state.loadingLogin = !!payload.credential;
      state.credential = payload.credential;
    },
    loginSuccess: (state: AuthSlice, { payload }: LoginSuccessAction) => {
      state.loadingLogin = false;
      state.token = payload.token;
      state.errorLogin = undefined;
      //   state.stepLogin = StepLogin.LOGIN_SUCCESS;
    },
    loginError: (state: AuthSlice, { payload }: ErrorAction) => {
      state.loadingLogin = false;
      state.errorLogin = payload;
      if (payload?.errorCode === ErrCode.ACCOUNT_NOT_VERIFIED) {
        state.stepLogin = StepLogin.INPUT_OTP;
      }
    },
    // register dispatch
    registerStart: (state: AuthSlice, { payload }: RegisterStartAction) => {
      state.loadingRegister = !!payload.fullName;
    },
    registerSuccess: (state: AuthSlice, { payload }: RegisterSuccessAction) => {
      state.loadingRegister = false;
      state.errorRegister = undefined;
      state.stepRegister = StepRegister.INPUT_OTP;
      state.credential = payload.email;
    },
    registerError: (state: AuthSlice, { payload }: ErrorAction) => {
      state.loadingRegister = false;
      state.errorRegister = payload;
    },

    // otp register dispatch
    verifyOtpRegisterStart: (state: AuthSlice, { payload }: VerifyOtpRegisterStartAction) => {
      state.loadingVerifyRegister = !!payload.otp;
    },
    verifyOtpRegisterSuccess: (state: AuthSlice, { payload }: VerifyOtpRegisterSuccessAction) => {
      state.loadingVerifyRegister = false;
      state.errorVerifyRegister = undefined;
      state.stepRegister = StepRegister.VERIFY_COMPLETED;
      //   state.stepLogin = StepLogin.LOGIN_SUCCESS;
      state.token = payload.token;
    },
    verifyOtpRegisterError: (state: AuthSlice, { payload }: ErrorAction) => {
      state.loadingVerifyRegister = false;
      state.errorVerifyRegister = payload;
    },

    // forgot password dispatch
    forgotPasswordStart: (state: AuthSlice, { payload }: ForgotPasswordStartAction) => {
      state.loadingForgotPassword = !!payload.credential;
      state.credential = payload.credential;
    },
    forgotPasswordSuccess: (state: AuthSlice, { payload }: ForgotPasswordSuccessAction) => {
      state.loadingForgotPassword = !payload.result;
      state.errorForgotPassword = undefined;
      state.stepForgotPassword = StepForgotPassword.INPUT_OTP_AND_PASSWORD;
    },
    forgotPasswordError: (state: AuthSlice, { payload }: ErrorAction) => {
      state.loadingForgotPassword = false;
      state.errorForgotPassword = payload;
    },

    // reset password otp dispatch
    resetPasswordOtpStart: (state: AuthSlice, { payload }: ResetPasswordOtpStartAction) => {
      state.loadingResetPasswordOtp = !!payload.credential;
      state.credential = payload.credential;
    },
    resetPasswordOtpSuccess: (state: AuthSlice, { payload }: ResetPasswordOtpSuccessAction) => {
      state.loadingResetPasswordOtp = !payload.result;
      state.errorResetPasswordOtp = undefined;
      state.stepForgotPassword = StepForgotPassword.RESET_PASSWORD_SUCCESS;
    },
    resetPasswordOtpError: (state: AuthSlice, { payload }: ErrorAction) => {
      state.loadingResetPasswordOtp = false;
      state.errorResetPasswordOtp = payload;
    },

    // logout dispatch
    logoutStart: (state: AuthSlice) => {
      state.loadingLogout = true;
    },
    logoutSuccess: () => {
      return initialState;
    },
    logoutError: (state: AuthSlice) => {
      state.loadingLogin = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload[sliceName],
      };
    });
  },
});

export const getAuthSlice = (state: RootState): AuthSlice => state[sliceName];

export const {
  loginStart,
  loginSuccess,
  loginError,
  logoutStart,
  logoutSuccess,
  logoutError,
  registerStart,
  registerSuccess,
  registerError,
  verifyOtpRegisterStart,
  verifyOtpRegisterSuccess,
  verifyOtpRegisterError,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordOtpStart,
  resetPasswordOtpSuccess,
  resetPasswordOtpError,
} = authSlice.actions;

export default persistReducer(getPersistConfig(sliceName, { whitelist: ['token'] }), authSlice.reducer);
