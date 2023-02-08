import { ChatLayout } from '@common/Layout/ChatLayout';
import useTopic from '@hooks/useTopic';
import { Stack } from '@mui/material';
import { getAccountSlice } from '@redux/slices/accountSlice';
import { getTopicSlice } from '@redux/slices/topicSlice';
import { useAppSelector } from '@redux/store';
import { AccountRole } from '@type/account';
import { FC, useEffect } from 'react';

export const InboxComponent: FC<any> = () => {
  const { onSubmitAddTopic, getMyTopics, getSystemTopics } = useTopic();
  const { loadedListTopic } = useAppSelector(getTopicSlice);
  const { account } = useAppSelector(getAccountSlice);
  // handle check account and get list topic for chat layout
  useEffect(() => {
    if (account?.role && !loadedListTopic) {
      account.role === AccountRole.ADMIN ? getSystemTopics() : getMyTopics();
    }
  }, [account?.role, loadedListTopic]);

  return (
    <ChatLayout isShowChatList onSubmitCreateTopic={onSubmitAddTopic}>
      <Stack direction="column" style={{ height: '100%' }}></Stack>
    </ChatLayout>
  );
};
