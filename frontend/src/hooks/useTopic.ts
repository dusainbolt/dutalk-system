import { addTopicStart, getMyTopicsStart, getTopicDetailStart, getTopicMessagesStart } from '@redux/slices/topicSlice';
import { useAppDispatch } from '@redux/store';
import { InputTopic } from '@type/topic';

export interface UseTopic {
  onSubmitAddTopic: (values: InputTopic) => void;
  getMyTopic: () => void;
  getTopicDetail: (topicId: string) => void;
  getTopicMessages: (topicId: string) => void;
}

function useTopic(): UseTopic {
  const dispatch = useAppDispatch();

  const onSubmitAddTopic = (values: InputTopic) => {
    dispatch(addTopicStart(values));
  };

  const getMyTopic = () => {
    dispatch(getMyTopicsStart({ includeLastMessage: 'true' }));
  };

  const getTopicDetail = (topicId: string) => {
    dispatch(getTopicDetailStart({ topicId }));
  };

  const getTopicMessages = (topicId: string) => {
    dispatch(getTopicMessagesStart({ topicId, query: { sort: 'id.ASC', limit: 30 } }));
  };

  return { onSubmitAddTopic, getMyTopic, getTopicDetail, getTopicMessages };
}

export default useTopic;
