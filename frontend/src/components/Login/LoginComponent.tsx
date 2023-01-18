import { FormRegisterOtp } from '@components/Register/FormRegisterOtp';
import useAuth from '@hooks/useAuth';
import { Box, Hidden, Stack, Typography } from '@mui/material';
import { getAuthSlice } from '@redux/slices/authSlice';
import { useAppSelector } from '@redux/store';
import { StepLogin } from '@type/auth';
import { Formik } from 'formik';
import { FC, Fragment, useMemo } from 'react';
import { validateLogin, validateOtpRegister, valuesLogin, valuesOtpRegister } from 'src/yup/validateAuth';
import { FormLogin } from './FormLogin';
import { styleLogin as styles } from './styles/Login.style';

const LoginComponent: FC<any> = () => {
  const { stepLogin } = useAppSelector(getAuthSlice);
  const { onSubmitOtp, onSubmitLogin } = useAuth();

  const contentRight = useMemo(() => {
    const formLogin = (
      <Fragment>
        <Typography variant="body1" sx={styles.titleContentRight} align="center">
          Đăng nhập
        </Typography>
        <Formik onSubmit={onSubmitLogin} validationSchema={validateLogin} initialValues={valuesLogin}>
          <FormLogin />
        </Formik>
      </Fragment>
    );

    const formOtp = (
      <Fragment>
        <Typography variant="body1" sx={styles.titleContentRight} align="center">
          Xác minh địa chỉ email
        </Typography>
        <Formik onSubmit={onSubmitOtp} validationSchema={validateOtpRegister} initialValues={valuesOtpRegister}>
          <FormRegisterOtp />
        </Formik>
      </Fragment>
    );

    switch (stepLogin) {
      case StepLogin.INPUT_OTP:
        return formOtp;
      default:
        return formLogin;
    }
  }, [stepLogin]);

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

export default LoginComponent;
