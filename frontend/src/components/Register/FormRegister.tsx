import { Button } from '@common/Button';
import FieldText from '@common/Form/FieldInput';
import { Box, Divider, Link, Stack, Typography } from '@mui/material';
import { getAuthSlice } from '@redux/slices/authSlice';
import { useAppSelector } from '@redux/store';
import { Field, useFormikContext } from 'formik';
import { AlertErrorApp } from 'src/shared/Alert/AlertErrorApp';
import { formRegisterStyles } from './styles/FormRegister.style';

export const FormRegister = () => {
  const { handleSubmit } = useFormikContext();
  const { loadingRegister, errorRegister } = useAppSelector(getAuthSlice);
  const styles = formRegisterStyles();
  return (
    <Stack>
      <AlertErrorApp error={errorRegister} />
      <>
        <Field name="fullName" fieldProps={{ placeholder: 'Nhập họ và tên' }} label="Họ và tên" component={FieldText} />
        <Field
          name="username"
          fieldProps={{ placeholder: 'Nhập tên nickname' }}
          label="Nickname"
          component={FieldText}
        />
        <Field
          fieldProps={{ type: 'email', placeholder: 'Nhập email' }}
          name="email"
          label="Email"
          component={FieldText}
        />
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
          loading={loadingRegister}
          onClick={handleSubmit as any}
          className={styles.btnRegister}
          variant="contained"
        >
          ĐĂNG KÝ
        </Button>
        <Box className={styles.boxTextBottom}>
          Bằng cách đăng ký DuTalk, bạn đồng ý với{' '}
          <Link style={{ textDecoration: 'underline' }} href="/dieu-khoan">
            Điều khoản dịch vụ
          </Link>{' '}
          và{' '}
          <Link style={{ textDecoration: 'underline' }} href="/chinh-sach">
            Chính sách quyền riêng tư
          </Link>{' '}
          của DuTalk.
        </Box>
        <Typography className={styles.linkWrap}>
          <a style={{ textDecoration: 'underline' }} href="/dang-nhap">
            Đăng nhập ngay
          </a>
        </Typography>
      </>
    </Stack>
  );
};
