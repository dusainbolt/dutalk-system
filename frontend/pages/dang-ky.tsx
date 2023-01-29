import RegisterComponent from '@components/Register/RegisterComponent';
import { useRedirectAuth } from '@hooks/useRedirectAuth';
import Head from 'next/head';
import { FC, Fragment } from 'react';

const RegisterPage: FC<any> = () => {
  const token = useRedirectAuth({ redirect: '/hop-thu', isEmptyToken: true });

  return (
    <Fragment>
      <Head>
        <title>DuTalk | Đăng ký</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      {!token && <RegisterComponent />}
    </Fragment>
  );
};

export default RegisterPage;
