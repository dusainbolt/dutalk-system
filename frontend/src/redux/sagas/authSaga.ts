import {
  ForgotPasswordStartAction,
  LoginStartAction,
  RegisterStartAction,
  ResetPasswordOtpStartAction,
  VerifyOtpRegisterStartAction,
} from '@redux/actions/authAction';
import {
  forgotPasswordError,
  forgotPasswordStart,
  forgotPasswordSuccess,
  loginError,
  loginStart,
  loginSuccess,
  logoutError,
  logoutStart,
  logoutSuccess,
  registerError,
  registerStart,
  registerSuccess,
  resetPasswordOtpError,
  resetPasswordOtpStart,
  resetPasswordOtpSuccess,
  verifyOtpRegisterError,
  verifyOtpRegisterStart,
  verifyOtpRegisterSuccess,
} from '@redux/slices/authSlice';
import { AuthRequest } from '@request/authRequset';
import axios from '@request/axios';
import Constant from '@utils/constant';
import Helper from '@utils/helper';
import { delay, put, takeLatest } from 'redux-saga/effects';

function* watchLogin({ payload }: LoginStartAction) {
  try {
    const response = yield AuthRequest.signIn(payload);
    yield delay(Constant.delayAPI);
    if (Helper.isOkResponse(response)) {
      yield axios.setTokenRequest(response.data?.token as any);
      yield put(loginSuccess(response.data));
    } else {
      yield put(loginError(response));
    }
  } catch (error: any) {
    yield put(loginError(null as any));
  }
}

function* watchRegister({ payload }: RegisterStartAction) {
  try {
    const response = yield AuthRequest.signUp(payload);
    yield delay(Constant.delayAPI);
    if (Helper.isOkResponse(response)) {
      yield put(registerSuccess(response.data));
    } else {
      yield put(registerError(response));
    }
  } catch (error: any) {
    yield put(registerError(null as any));
  }
}

function* watchVerifyOtpRegister({ payload }: VerifyOtpRegisterStartAction) {
  try {
    const response = yield AuthRequest.verifyAccount(payload);
    yield delay(Constant.delayAPI);
    if (Helper.isOkResponse(response)) {
      yield axios.setTokenRequest(response.data?.token as any);
      yield put(verifyOtpRegisterSuccess(response.data));
    } else {
      yield put(verifyOtpRegisterError(response));
    }
  } catch (error: any) {
    yield put(verifyOtpRegisterError(null as any));
  }
}

function* watchForgotPassword({ payload }: ForgotPasswordStartAction) {
  try {
    const response = yield AuthRequest.forgotPassword(payload);
    yield delay(Constant.delayAPI);
    if (Helper.isOkResponse(response)) {
      yield put(forgotPasswordSuccess(response.data));
    } else {
      yield put(forgotPasswordError(response));
    }
  } catch (error: any) {
    yield put(forgotPasswordError(null as any));
  }
}

function* watchResetPasswordOtp({ payload }: ResetPasswordOtpStartAction) {
  try {
    const response = yield AuthRequest.resetPasswordOtp(payload);
    yield delay(Constant.delayAPI);
    if (Helper.isOkResponse(response)) {
      yield put(resetPasswordOtpSuccess(response.data));
    } else {
      yield put(resetPasswordOtpError(response));
    }
  } catch (error: any) {
    yield put(resetPasswordOtpError(null as any));
  }
}

function* watchLogout() {
  try {
    const response = yield AuthRequest.logout();
    yield delay(Constant.delayAPI);
    if (Helper.isOkResponse(response)) {
      yield put(logoutSuccess());
    } else {
      yield put(logoutError());
    }
  } catch (error: any) {
    yield put(logoutError());
  }
}

export default function* authSaga(): any {
  yield takeLatest(loginStart, watchLogin);
  yield takeLatest(registerStart, watchRegister);
  yield takeLatest(verifyOtpRegisterStart, watchVerifyOtpRegister);
  yield takeLatest(forgotPasswordStart, watchForgotPassword);
  yield takeLatest(resetPasswordOtpStart, watchResetPasswordOtp);
  yield takeLatest(logoutStart, watchLogout);
}
