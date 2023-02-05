import { Button } from '@common/Button';
import { FieldOtp } from '@common/Form/FieldOtp';
import { Box, Stack, Typography } from '@mui/material';
import { getAuthSlice } from '@redux/slices/authSlice';
import { useAppSelector } from '@redux/store';
import { Field, useFormikContext } from 'formik';
import { useEffect } from 'react';
import { AlertErrorApp } from 'src/shared/Alert/AlertErrorApp';
import { formRegisterOtpStyles } from './styles/FormOtp.style';

export const FormRegisterOtp = () => {
  const { handleSubmit, setFieldValue } = useFormikContext();
  const { loadingVerifyRegister, errorRegister, credential } = useAppSelector(getAuthSlice);
  const styles = formRegisterOtpStyles();

  useEffect(() => {
    setFieldValue('credential', credential);
  }, [credential]);

  return (
    <Stack>
      <AlertErrorApp error={errorRegister} />
      <Typography className={styles.description_1}>
        Mã xác nhận đã được gửi tới địa chỉ email của tài khoản: <b>{credential}</b>. Vui lòng kiểm tra email và nhập
        đoạn mã dưới đây:
      </Typography>
      <Box className={styles.boxOtp}>
        <Field name="otp" label="Nickname" className="otp-register-input" component={FieldOtp} />
        <Button
          onClick={handleSubmit as any}
          loading={loadingVerifyRegister}
          className={styles.btnConfirm}
          variant="contained"
        >
          Xác minh
        </Button>
      </Box>
    </Stack>
  );
};
