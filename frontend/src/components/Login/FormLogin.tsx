import { Button } from '@common/Button';
import FieldText from '@common/Form/FieldInput';
import { Stack, Typography } from '@mui/material';
import { getAuthSlice } from '@redux/slices/authSlice';
import { useAppSelector } from '@redux/store';
import { Field, useFormikContext } from 'formik';
import { AlertErrorApp } from 'src/shared/Alert/AlertErrorApp';
import { formLoginStyles } from './styles/FormLogin.style';

export const FormLogin = () => {
  const { handleSubmit } = useFormikContext();
  const { loadingLogin, errorLogin } = useAppSelector(getAuthSlice);
  const styles = formLoginStyles();
  return (
    <Stack>
      <AlertErrorApp error={errorLogin} />
      <>
        <Field
          fieldProps={{ type: 'email', placeholder: 'Nhập email hoặc nickname' }}
          name="credential"
          label="Tên đăng nhập"
          component={FieldText}
        />
        <Field
          name="password"
          fieldProps={{ placeholder: 'Nhập Mật khẩu', type: 'password' }}
          label="Mật khẩu"
          component={FieldText}
        />

        <Button loading={loadingLogin} onClick={handleSubmit as any} className={styles.btnLogin} variant="contained">
          Đăng nhập
        </Button>
        <Typography className={styles.linkWrap}>
          <a style={{ textDecoration: 'underline' }} href="/dang-ky">
            Tạo tài khoản mới
          </a>
          <span> | </span>
          <a style={{ textDecoration: 'underline' }} href="/quen-mat-khau">
            Quên mật khẩu
          </a>
        </Typography>
      </>
    </Stack>
  );
};
