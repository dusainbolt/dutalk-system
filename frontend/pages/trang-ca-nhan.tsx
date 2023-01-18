import ProfileComponent from '@components/Profile/ProfileComponent';
import { useRedirectAuth } from '@hooks/useRedirectAuth';
import Head from 'next/head';
import { FC, Fragment } from 'react';

const ProfilePage: FC<any> = () => {
  const token = useRedirectAuth({ redirect: '/', isEmptyToken: false });
  return (
    <Fragment>
      <Head>
        <title>DuTalk | Trang cá nhân</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      {token && <ProfileComponent />}
    </Fragment>
  );
};

export default ProfilePage;
