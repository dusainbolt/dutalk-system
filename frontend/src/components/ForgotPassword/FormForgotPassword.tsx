import { Button } from '@common/Button';
import FieldText from '@common/Form/FieldInput';
import { Divider, Stack, Typography } from '@mui/material';
import { getAuthSlice } from '@redux/slices/authSlice';
import { useAppSelector } from '@redux/store';
import { Field, useFormikContext } from 'formik';
import { AlertErrorApp } from 'src/shared/Alert/AlertErrorApp';
import { styleFormForgotPassword as styles } from './styles/FormForgotPassword';

export const FormForgotPassword = () => {
  const { handleSubmit } = useFormikContext();
  const { loadingForgotPassword, errorForgotPassword } = useAppSelector(getAuthSlice);
  return (
    <Stack>
      <AlertErrorApp error={errorForgotPassword} />
      <>
        <Field
          fieldProps={{ type: 'email', placeholder: 'Nhập email hoặc nickname' }}
          name="credential"
          label="Email hoặc nickname"
          component={FieldText}
        />

        <Button loading={loadingForgotPassword} onClick={handleSubmit as any} sx={styles.btnSearch} variant="contained">
          TÌM KIẾM
        </Button>
        <Typography sx={styles.linkHome}>
          <a style={{ textDecoration: 'underline' }} href="/">
            Trang chủ
          </a>
        </Typography>
        <Divider sx={{ mt: 3 }} />
        <Button href="/dang-nhap" sx={styles.btnLogin} variant="contained">
          Đăng nhập
        </Button>
      </>
    </Stack>
  );
};
