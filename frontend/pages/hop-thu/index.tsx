import { InboxComponent } from '@components/Inbox/InboxComponent';
import { useGetAccountInfo } from '@hooks/useGetAccountInfo';
import { useRedirectAuth } from '@hooks/useRedirectAuth';
import Head from 'next/head';
import { FC, Fragment } from 'react';

const InboxDefaultPage: FC<any> = () => {
  const token = useRedirectAuth({ redirect: '/', isEmptyToken: false });
  useGetAccountInfo(token as string);

  return (
    <Fragment>
      <Head>
        <title>DuTalk</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      {token && <InboxComponent />}
    </Fragment>
  );
};

export default InboxDefaultPage;
