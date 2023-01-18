import { Button } from '@common/Button';
import FieldText from '@common/Form/FieldInput';
import { FieldOtp } from '@common/Form/FieldOtp';
import { Box, Stack, Typography } from '@mui/material';
import { getAuthSlice } from '@redux/slices/authSlice';
import { useAppSelector } from '@redux/store';
import { Field, useFormikContext } from 'formik';
import { useEffect } from 'react';
import { AlertErrorApp } from 'src/shared/Alert/AlertErrorApp';
import { styleFormResetPasswordOtp as styles } from './styles/FormResetPasswordOtp.style';

export const FormResetPasswordOtp = () => {
  const { handleSubmit, setFieldValue } = useFormikContext();
  const { loadingResetPasswordOtp, errorResetPasswordOtp, credential } = useAppSelector(getAuthSlice);

  useEffect(() => {
    setFieldValue('credential', credential);
  }, [credential]);

  return (
    <Stack>
      <AlertErrorApp error={errorResetPasswordOtp} />
      <Typography sx={styles.description_1}>
        Mã xác nhận đã được gửi tới địa chỉ email của tài khoản: <b>{credential}</b>. Vui lòng kiểm tra email và nhập
        đoạn mã dưới đây:
      </Typography>
      <Box sx={styles.boxOtp}>
        <Field name="otp" label="Nickname" className="otp-register-input" component={FieldOtp} />
        <Field
          name="password"
          fieldProps={{ placeholder: 'Nhập Mật khẩu', type: 'password' }}
          label="Mật khẩu"
          component={FieldText}
        />

        <Field
          name="rePassword"
          fieldProps={{ placeholder: 'Xác nhận mật khẩu', type: 'password' }}
          label="Nhập lại mật khẩu"
          component={FieldText}
          type="password"
        />
        <Button
          onClick={handleSubmit as any}
          loading={loadingResetPasswordOtp}
          sx={styles.btnConfirm}
          variant="contained"
        >
          Xác minh
        </Button>
      </Box>
    </Stack>
  );
};
