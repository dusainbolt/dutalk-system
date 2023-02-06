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

export interface UseTopic {
  onSubmitAddTopic: (values: InputTopic) => void;
  getMyTopics: () => void;
  getSystemTopics: () => void;
  getTopicDetail: (topicId: string) => void;
  getTopicMessages: (topicId: string) => void;
}

function useTopic(): UseTopic {
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

  const getTopicMessages = (topicId: string) => {
    dispatch(getTopicMessagesStart({ topicId, query: { sort: 'id.ASC', limit: 30 } }));
  };

  return { onSubmitAddTopic, getMyTopics, getSystemTopics, getTopicDetail, getTopicMessages };
}

export default useTopic;
