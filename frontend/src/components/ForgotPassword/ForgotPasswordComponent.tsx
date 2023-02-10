import { Button } from '@common/Button';
import { AuthenticationLayout } from '@common/Layout/AuthenticationLayout';
import useAuth from '@hooks/useAuth';
import { Alert, Stack } from '@mui/material';
import { getAuthSlice } from '@redux/slices/authSlice';
import { useAppSelector } from '@redux/store';
import { StepForgotPassword } from '@type/auth';
import { Formik } from 'formik';
import { FC, Fragment, useMemo } from 'react';
import {
  validateForgotPassword,
  validateResetPasswordOtp,
  valuesForgotPassword,
  valuesResetPasswordOtp,
} from 'src/yup/validateAuth';
import { FormForgotPassword } from './FormForgotPassword';
import { FormResetPasswordOtp } from './FormResetPasswordOtp';

const ForgotPasswordComponent: FC<any> = () => {
  const { stepForgotPassword } = useAppSelector(getAuthSlice);
  const { onSubmitForgotPassword, onSubmitResetPasswordOtp } = useAuth();

  const contentRight = useMemo(() => {
    const formForgotPassword = (
      <Fragment>
        {/* <Typography variant="body1" className={styles.titleContentRight} align="center">
          Quên mật khẩu
        </Typography> */}
        <Formik
          onSubmit={onSubmitForgotPassword}
          validationSchema={validateForgotPassword}
          initialValues={valuesForgotPassword}
        >
          <FormForgotPassword />
        </Formik>
      </Fragment>
    );

    const formOtpAndPassword = (
      <Fragment>
        {/* <Typography variant="body1" className={styles.titleContentRight} align="center">
          Xác minh và đặt lại mật khẩu
        </Typography> */}
        <Formik
          onSubmit={onSubmitResetPasswordOtp}
          validationSchema={validateResetPasswordOtp}
          initialValues={valuesResetPasswordOtp}
        >
          <FormResetPasswordOtp />
        </Formik>
      </Fragment>
    );

    const contentResetPasswordOtpSuccess = (
      <Stack>
        <Alert severity="success">Đặt lại mật khẩu thành công. Quay lại đăng nhập ngay thôi!</Alert>
        <Button href="/dang-nhap" sx={{ mt: 2.5 }} variant="contained">
          Đăng nhập
        </Button>
      </Stack>
    );

    switch (stepForgotPassword) {
      case StepForgotPassword.INPUT_OTP_AND_PASSWORD:
        return formOtpAndPassword;
      case StepForgotPassword.RESET_PASSWORD_SUCCESS:
        return contentResetPasswordOtpSuccess;
      default:
        return formForgotPassword;
    }
  }, [stepForgotPassword]);

  return <AuthenticationLayout>{contentRight}</AuthenticationLayout>;
};

export default ForgotPasswordComponent;
