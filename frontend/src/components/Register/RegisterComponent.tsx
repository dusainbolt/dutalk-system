import { Button } from '@common/Button';
import { AuthenticationLayout } from '@common/Layout/AuthenticationLayout';
import useAuth from '@hooks/useAuth';
import { Alert, Box } from '@mui/material';
import { getAuthSlice } from '@redux/slices/authSlice';
import { useAppSelector } from '@redux/store';
import { StepRegister } from '@type/auth';
import { Formik } from 'formik';
import { FC, Fragment, useMemo } from 'react';
import { validateOtpRegister, validateRegister, valuesOtpRegister, valuesRegister } from 'src/yup/validateAuth';
import { FormRegister } from './FormRegister';
import { FormRegisterOtp } from './FormRegisterOtp';

const RegisterComponent: FC<any> = () => {
  const { stepRegister } = useAppSelector(getAuthSlice);
  const { onSubmitRegister, onSubmitOtp } = useAuth();

  const contentRight = useMemo(() => {
    const formRegister = (
      <Fragment>
        {/* <Typography variant="body1" className={styles.titleContentRight} align="center">
          Đăng ký
        </Typography> */}
        <Formik onSubmit={onSubmitRegister} validationSchema={validateRegister} initialValues={valuesRegister}>
          <FormRegister />
        </Formik>
      </Fragment>
    );

    const formOtp = (
      <Fragment>
        {/* <Typography variant="body1" className={styles.titleContentRight} align="center">
          Xác minh địa chỉ email
        </Typography> */}
        <Formik onSubmit={onSubmitOtp} validationSchema={validateOtpRegister} initialValues={valuesOtpRegister}>
          <FormRegisterOtp />
        </Formik>
      </Fragment>
    );

    const registerSuccessContent = (
      <Box>
        <Alert severity="success">Xác minh thành công. Trải nghiệm dịch vụ thôi nào!</Alert>
        <Button href="/dang-nhap" sx={{ mt: 2.5 }} variant="contained">
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

  return <AuthenticationLayout>{contentRight}</AuthenticationLayout>;
};

export default RegisterComponent;
