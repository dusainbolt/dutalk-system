import { sendMessageStart } from '@redux/slices/socketSlice';
import { useAppDispatch } from '@redux/store';

export interface UseMessage {
  onSubmitSendMessage: (values: any) => void;
}

function useMessage(): UseMessage {
  const dispatch = useAppDispatch();

  const onSubmitSendMessage = (values: any) => {
    dispatch(sendMessageStart(values));
  };
  return { onSubmitSendMessage };
}

export default useMessage;
