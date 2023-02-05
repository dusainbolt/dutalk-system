import { InboxChatComponent } from '@components/Inbox/InboxChatComponent';
import { useGetAccountInfo } from '@hooks/useGetAccountInfo';
import { useRedirectAuth } from '@hooks/useRedirectAuth';
import useSocket from '@hooks/useSocket';
import Head from 'next/head';
import { FC, Fragment } from 'react';

const InboxChatPage: FC<any> = () => {
  const token = useRedirectAuth({ redirect: '/', isEmptyToken: false });
  useGetAccountInfo(token as string);
  useSocket();
  return (
    <Fragment>
      <Head>
        <title>DuTalk</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      {token && <InboxChatComponent />}
    </Fragment>
  );
};

export default InboxChatPage;
