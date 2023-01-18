import { Alert } from '@mui/material';
import { AppError } from '@type/context';
import { ErrMsg } from '@utils/error';
import { FC } from 'react';

export const AlertErrorApp: FC<{ error?: AppError }> = ({ error }) => {
  const errorCode = error?.errorCode;
  return errorCode ? <Alert severity="warning">{ErrMsg[errorCode]}</Alert> : <></>;
};
