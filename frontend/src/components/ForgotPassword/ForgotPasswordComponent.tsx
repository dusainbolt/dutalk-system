import { Button } from '@common/Button';
import useAuth from '@hooks/useAuth';
import { Alert, Box, Hidden, Stack, Typography } from '@mui/material';
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
import { styleForgotPassword as styles } from './styles/ForgotPassword.style';

const ForgotPasswordComponent: FC<any> = () => {
  const { stepForgotPassword } = useAppSelector(getAuthSlice);
  const { onSubmitForgotPassword, onSubmitResetPasswordOtp } = useAuth();

  const contentRight = useMemo(() => {
    const formForgotPassword = (
      <Fragment>
        <Typography variant="body1" sx={styles.titleContentRight} align="center">
          Quên mật khẩu
        </Typography>
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
        <Typography variant="body1" sx={styles.titleContentRight} align="center">
          Xác minh và đặt lại mật khẩu
        </Typography>
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
        <Button href="/dang-nhap" sx={styles.btnLogin} variant="contained">
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

  return (
    <main>
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Stack sx={styles.mainContentLeft} alignItems="center" justifyContent="center">
          <Typography sx={styles.titleApp} variant="h1" align="center">
            DuTalk
          </Typography>
          <Typography sx={styles.description_1} variant="h1" align="center">
            Nền tảng trò chuyện tâm sự khiến bạn khóc thét
          </Typography>
          <Typography sx={styles.description_2} variant="h1" align="center">
            Hãy nói với tôi theo cách của bạn
          </Typography>
        </Stack>
        <Hidden mdDown>
          <Stack alignItems="center" sx={{ width: '45%' }} justifyContent="center"></Stack>
        </Hidden>
        <Stack alignItems="center" sx={styles.mainContentRight} justifyContent="center">
          <Box sx={styles.boxContentRight}>{contentRight}</Box>
        </Stack>
      </Stack>
    </main>
  );
};

export default ForgotPasswordComponent;
