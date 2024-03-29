import { HttpStatus } from '@nestjs/common';

export interface AppError {
  code: string;
  message: string;
  status: HttpStatus;
}

export enum ErrorType {
  APP_ERROR = 'app_error',
  SERVER_ERROR = 'server_error',
}

export enum ERROR_CODE {
  // TEST
  ERROR_EXCEPTION = 'ERROR_EXCEPTION',

  // AUTH
  AUTH_UNAUTHORIZED_ACCESS_TOKEN = 'AUTH_UNAUTHORIZED_ACCESS_TOKEN',
  AUTH_TOKEN_CLAIMS_BEFORE = 'AUTH_TOKEN_CLAIMS_BEFORE',
  AUTH_TOKEN_EXPIRED = 'AUTH_TOKEN_EXPIRED',
  AUTH_TOKEN_INVALID = 'AUTH_TOKEN_INVALID',
  AUTH_PASSWORD_INCORRECT = 'AUTH_PASSWORD_INCORRECT',
  AUTH_NOT_FOUND_OTP = 'AUTH_NOT_FOUND_OTP',
  AUTH_OTP_NOT_MATCH = 'AUTH_OTP_NOT_MATCH',

  // ACCOUNT
  ACCOUNT_INACTIVE = 'ACCOUNT_INACTIVE',
  ACCOUNT_USERNAME_EMAIL_ALREADY_REGISTER = 'ACCOUNT_USERNAME_EMAIL_ALREADY_REGISTER',
  ACCOUNT_NOT_FOUND = 'ACCOUNT_NOT_FOUND',
  ACCOUNT_VERIFIED = 'ACCOUNT_VERIFIED',
  ACCOUNT_NOT_VERIFIED = 'ACCOUNT_NOT_VERIFIED',

  TOPIC_TITLE_EXIST_BY_ACCOUNT = 'TOPIC_TITLE_EXIST_BY_ACCOUNT',
  TOPIC_DO_NOT_PERMISSION = 'TOPIC_DO_NOT_PERMISSION',
}
