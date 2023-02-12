import { getAccountSlice } from '@redux/slices/accountSlice';
import {
  addTopicStart,
  getMyTopicsStart,
  getSystemTopicsStart,
  getTopicDetailStart,
  getTopicMessagesStart,
} from '@redux/slices/topicSlice';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { AccountRole } from '@type/account';
import { InputTopic } from '@type/topic';
import { useState } from 'react';

export interface UseTopic {
  onSubmitAddTopic: (values: InputTopic) => void;
  getMyTopics: () => void;
  getSystemTopics: () => void;
  getTopicDetail: (topicId: string) => void;
  getTopicMessages: (topicId: number) => void;
  loadMoreTopicMessages: (topicId: number, latestMessageId: number) => void;
}

export const queryTopicMessages = { sort: 'id.DESC', limit: 20 };

function useTopic(): UseTopic {
  const [latestMessageId, setLatestMessageId] = useState<number>(0);

  const dispatch = useAppDispatch();
  const { account } = useAppSelector(getAccountSlice);

  const onSubmitAddTopic = (values: InputTopic) => {
    dispatch(addTopicStart(values));
  };

  const getMyTopics = () => {
    dispatch(getMyTopicsStart({ lastMessage: 'true', account: 'true' }));
  };

  const getSystemTopics = () => {
    dispatch(getSystemTopicsStart({ lastMessage: 'true', account: 'true' }));
  };

  const getTopicDetail = (topicId: string) => {
    dispatch(
      getTopicDetailStart({ topicId, query: { account: account?.role === AccountRole.ADMIN ? 'true' : 'false' } })
    );
  };

  const loadMoreTopicMessages = (topicId: number, _latestMessageId: number) => {
    if (_latestMessageId !== latestMessageId) {
      setLatestMessageId(_latestMessageId);
      dispatch(getTopicMessagesStart({ topicId, query: { ...queryTopicMessages, latestMessageId: _latestMessageId } }));
    }
  };

  const getTopicMessages = (topicId: number) => {
    dispatch(getTopicMessagesStart({ topicId, query: { ...queryTopicMessages } }));
  };

  return {
    onSubmitAddTopic,
    getMyTopics,
    getSystemTopics,
    getTopicDetail,
    loadMoreTopicMessages,
    getTopicMessages,
  };
}

export default useTopic;
