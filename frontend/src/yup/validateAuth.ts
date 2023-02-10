import { InputForgotPassword, InputResetPasswordOtp, InputLogin, InputOtpRegister, InputRegister } from '@type/auth';
import Validate from '@utils/validate';
import * as yup from 'yup';

export const valuesRegister: InputRegister = {
  username: '',
  password: '',
  rePassword: '',
  fullName: '',
  email: '',
};

export const valuesOtpRegister: InputOtpRegister = {
  otp: '',
  credential: '',
};

export const validateRegister = yup.object({
  username: yup
    .string()
    .required(Validate.require('Nickname'))
    .min(5, Validate.during(5, 39))
    .max(39, Validate.during(5, 39))
    .matches(/^[a-zA-Z0-9_]*$/, Validate.username('Nickname')),
  fullName: yup
    .string()
    .required(Validate.require('Họ và tên'))
    .min(5, Validate.during(5, 39))
    .max(39, Validate.during(5, 39)),
  email: yup.string().required(Validate.require('Email')).email(Validate.email()),
  password: yup.string().required(Validate.require('Mật khẩu')).min(8, Validate.min(8)),
  rePassword: yup
    .string()
    .required(Validate.require('Mật khẩu'))
    .oneOf([yup.ref('password'), null], 'Mật khẩu xác nhận không trùng khớp'),
});

export const validateOtpRegister = yup.object({
  otp: yup.string().required(Validate.require('Mã xác nhận')).length(6, Validate._length(6)),
  credential: yup.string().required(),
});

export const valuesLogin: InputLogin = {
  credential: '',
  password: '',
};

export const validateLogin = yup.object({
  credential: yup.string().required(Validate.require('Tên đăng nhập')),
  password: yup.string().required(Validate.require('Mật khẩu')).min(8, Validate.min(8)),
});

export const valuesForgotPassword: InputForgotPassword = {
  credential: '',
};

export const validateForgotPassword = yup.object({
  credential: yup.string().required(Validate.require('Tên đăng nhập')),
});

export const valuesResetPasswordOtp: InputResetPasswordOtp = {
  credential: '',
  password: '',
  rePassword: '',
  otp: '',
};

export const validateResetPasswordOtp = yup.object({
  credential: yup.string().required(Validate.require('Tên đăng nhập')),
  otp: yup.string().required(Validate.require('Mã xác nhận')).length(6, Validate._length(6)),
  password: yup.string().required(Validate.require('Mật khẩu')).min(8, Validate.min(8)),
  rePassword: yup
    .string()
    .required(Validate.require('Mật khẩu'))
    .oneOf([yup.ref('password'), null], 'Mật khẩu xác nhận không trùng khớp'),
});
