import { AuthenticationLayout } from '@common/Layout/AuthenticationLayout';
import { FormRegisterOtp } from '@components/Register/FormRegisterOtp';
import useAuth from '@hooks/useAuth';
import { getAuthSlice } from '@redux/slices/authSlice';
import { useAppSelector } from '@redux/store';
import { StepLogin } from '@type/auth';
import { Formik } from 'formik';
import { FC, Fragment, useMemo } from 'react';
import { validateLogin, validateOtpRegister, valuesLogin, valuesOtpRegister } from 'src/yup/validateAuth';
import { FormLogin } from './FormLogin';

const LoginComponent: FC<any> = () => {
  const { stepLogin } = useAppSelector(getAuthSlice);
  const { onSubmitOtp, onSubmitLogin } = useAuth();
  const contentRight = useMemo(() => {
    const formLogin = (
      <Fragment>
        <Formik onSubmit={onSubmitLogin} validationSchema={validateLogin} initialValues={valuesLogin}>
          <FormLogin />
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

    switch (stepLogin) {
      case StepLogin.INPUT_OTP:
        return formOtp;
      default:
        return formLogin;
    }
  }, [stepLogin]);

  return <AuthenticationLayout>{contentRight}</AuthenticationLayout>;
};

export default LoginComponent;
