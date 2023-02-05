import { SocketSendMessageDto } from '@type/socket';
import Validate from '@utils/validate';
import * as yup from 'yup';

export const valuesSendMessage: SocketSendMessageDto = {
  topicId: 0,
  message: '',
};

export const validateSendMessage = yup.object({
  topicId: yup.number().required(Validate.require('topicId')),
  message: yup.string().trim().required(Validate.require('message')),
});
