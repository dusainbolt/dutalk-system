import { Button } from '@common/Button';
import useAuth from '@hooks/useAuth';
import { Alert, Box, Hidden, Stack, Typography } from '@mui/material';
import { getAuthSlice } from '@redux/slices/authSlice';
import { useAppSelector } from '@redux/store';
import { StepRegister } from '@type/auth';
import { Formik } from 'formik';
import { FC, Fragment, useMemo } from 'react';
import { validateOtpRegister, validateRegister, valuesOtpRegister, valuesRegister } from 'src/yup/validateAuth';
import { FormRegister } from './FormRegister';
import { FormRegisterOtp } from './FormRegisterOtp';
import { registerStyles } from './styles/Register.style';

const RegisterComponent: FC<any> = () => {
  const { stepRegister } = useAppSelector(getAuthSlice);
  const { onSubmitRegister, onSubmitOtp } = useAuth();
  const styles = registerStyles();

  const contentRight = useMemo(() => {
    const formRegister = (
      <Fragment>
        <Typography variant="body1" className={styles.titleContentRight} align="center">
          Đăng ký
        </Typography>
        <Formik onSubmit={onSubmitRegister} validationSchema={validateRegister} initialValues={valuesRegister}>
          <FormRegister />
        </Formik>
      </Fragment>
    );

    const formOtp = (
      <Fragment>
        <Typography variant="body1" className={styles.titleContentRight} align="center">
          Xác minh địa chỉ email
        </Typography>
        <Formik onSubmit={onSubmitOtp} validationSchema={validateOtpRegister} initialValues={valuesOtpRegister}>
          <FormRegisterOtp />
        </Formik>
      </Fragment>
    );

    const registerSuccessContent = (
      <Box>
        <Alert severity="success">Xác minh thành công. Trải nghiệm dịch vụ thôi nào!</Alert>
        <Button href="/dang-nhap" className={styles.btnLoginNow} variant="contained">
          Đăng nhập ngay
        </Button>
      </Box>
    );

    switch (stepRegister) {
      case StepRegister.INPUT_OTP:
        return formOtp;
      case StepRegister.VERIFY_COMPLETED:
        return registerSuccessContent;
      default:
        return formRegister;
    }
  }, [stepRegister]);

  return (
    <main>
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Stack className={styles.mainContentLeft} alignItems="center" justifyContent="center">
          <Typography className={styles.titleApp} variant="h1" align="center">
            DuTalk
          </Typography>
          <Typography className={styles.description_1} variant="h1" align="center">
            Nền tảng trò chuyện tâm sự khiến bạn khóc thét
          </Typography>
          <Typography className={styles.description_2} variant="h1" align="center">
            Hãy nói với tôi theo cách của bạn
          </Typography>
        </Stack>
        <Hidden mdDown>
          <Stack alignItems="center" style={{ width: '45%' }} justifyContent="center"></Stack>
        </Hidden>
        <Stack alignItems="center" className={styles.mainContentRight} justifyContent="center">
          <Box className={styles.boxContentRight}>{contentRight}</Box>
        </Stack>
      </Stack>
    </main>
  );
};

export default RegisterComponent;
