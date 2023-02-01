import { addTopicStart, getMyTopicsStart } from '@redux/slices/topicSlice';
import { useAppDispatch } from '@redux/store';
import { InputTopic } from '@type/topic';

export interface UseTopic {
  onSubmitAddTopic: (values: InputTopic) => void;
  getMyTopic: () => void;
}

function useTopic(): UseTopic {
  const dispatch = useAppDispatch();

  const onSubmitAddTopic = (values: InputTopic) => {
    dispatch(addTopicStart(values));
  };

  const getMyTopic = () => {
    dispatch(getMyTopicsStart({ includeLastMessage: 'true' }));
  };

  return { onSubmitAddTopic, getMyTopic };
}

export default useTopic;
