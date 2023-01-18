import ForgotPasswordComponent from '@components/ForgotPassword/ForgotPasswordComponent';
import { useRedirectAuth } from '@hooks/useRedirectAuth';
import Head from 'next/head';
import { FC, Fragment } from 'react';

const ForgotPasswordPage: FC<any> = () => {
  const token = useRedirectAuth({ redirect: '/trang-ca-nhan', isEmptyToken: true });

  return (
    <Fragment>
      <Head>
        <title>DuTalk | Quên mật khẩu</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      {!token && <ForgotPasswordComponent />}
    </Fragment>
  );
};

export default ForgotPasswordPage;
