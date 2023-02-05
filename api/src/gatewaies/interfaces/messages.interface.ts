import { Message } from 'src/entities/message.entity';
import { Topic } from 'src/entities/topic.entity';

export type SocketSendMessageDto = { message: string; topicId: number };
export type SocketTopicMessagesReceiveDto = { message: Message; topic: Topic };
