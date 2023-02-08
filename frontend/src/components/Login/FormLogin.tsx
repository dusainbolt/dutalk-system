import { Button } from '@common/Button';
import FieldText from '@common/Form/FieldInput';
import { Divider, Stack, Typography } from '@mui/material';
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
          label="Email hoặc nickname"
          component={FieldText}
        />
        <Field
          name="password"
          fieldProps={{ placeholder: 'Nhập Mật khẩu', type: 'password' }}
          label="Mật khẩu"
          component={FieldText}
        />

        <Button loading={loadingLogin} onClick={handleSubmit as any} className={styles.btnLogin} variant="contained">
          ĐĂNG NHẬP
        </Button>
        <Typography className={styles.linkForgotPass}>
          <a style={{ textDecoration: 'underline' }} href="/quen-mat-khau">
            Quên mật khẩu
          </a>
        </Typography>
        <Divider style={{ marginTop: 24 }} />
        <Button href="/dang-ky" className={styles.btnRegister} variant="contained">
          Tạo tài khoản mới
        </Button>
      </>
    </Stack>
  );
};
