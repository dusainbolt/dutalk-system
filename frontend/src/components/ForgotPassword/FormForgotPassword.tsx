import { Button } from '@common/Button';
import FieldText from '@common/Form/FieldInput';
import { Stack, Typography } from '@mui/material';
import { getAuthSlice } from '@redux/slices/authSlice';
import { useAppSelector } from '@redux/store';
import { Field, useFormikContext } from 'formik';
import { AlertErrorApp } from 'src/shared/Alert/AlertErrorApp';
import { formForgotPasswordStyles } from './styles/FormForgotPassword';

export const FormForgotPassword = () => {
  const { handleSubmit } = useFormikContext();
  const { loadingForgotPassword, errorForgotPassword } = useAppSelector(getAuthSlice);
  const styles = formForgotPasswordStyles();
  return (
    <Stack>
      <AlertErrorApp error={errorForgotPassword} />
      <>
        <Field
          fieldProps={{ type: 'email', placeholder: 'Nhập email hoặc nickname' }}
          name="credential"
          label="Tên đăng nhập"
          component={FieldText}
        />

        <Button
          loading={loadingForgotPassword}
          onClick={handleSubmit as any}
          className={styles.btnSearch}
          variant="contained"
        >
          TÌM KIẾM
        </Button>
        <Typography className={styles.linkWrap}>
          <a style={{ textDecoration: 'underline' }} href="/dang-ky">
            Tạo tài khoản mới
          </a>
          <span> | </span>
          <a style={{ textDecoration: 'underline' }} href="/dang-nhap">
            Đăng nhập
          </a>
        </Typography>
      </>
    </Stack>
  );
};
