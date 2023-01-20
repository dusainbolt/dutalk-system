import ProfileComponent from '@components/Profile/ProfileComponent';
import { useGetAccountInfo } from '@hooks/useGetAccountInfo';
import { useRedirectAuth } from '@hooks/useRedirectAuth';
import Head from 'next/head';
import { FC, Fragment } from 'react';

const ProfilePage: FC<any> = () => {
  const token = useRedirectAuth({ redirect: '/', isEmptyToken: false });
  useGetAccountInfo(token as string);

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
