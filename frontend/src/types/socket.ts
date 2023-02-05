import { Message } from './message';
import { Topic } from './topic';

export type SocketSlice = {
  isLoadingSendMessage?: boolean;
};

export type SocketSendMessageDto = { message: string; topicId: number };
export type SocketTopicMessagesReceiveDto = { message: Message; topic: Topic };
