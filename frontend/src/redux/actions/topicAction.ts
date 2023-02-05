import { PayloadName } from '@redux/reducer';
import { Message } from '@type/message';
import { GetMyTopicsDto, GetTopicDetailDto, GetTopicMessagesDto, InputTopic, Topic } from '@type/topic';

export type AddTopicStartAction = Record<PayloadName, InputTopic>;
export type AddTopicSuccessAction = Record<PayloadName, Topic>;
export type GetMyTopicsStartAction = Record<PayloadName, GetMyTopicsDto>;
export type GetMyTopicsSuccessAction = Record<PayloadName, Topic[]>;
export type GetTopicDetailStartAction = Record<PayloadName, GetTopicDetailDto>;
export type GetTopicDetailSuccessAction = Record<PayloadName, Topic>;
export type GetTopicMessagesStartAction = Record<PayloadName, GetTopicMessagesDto>;
export type GetTopicMessagesSuccessAction = Record<PayloadName, Message[]>;
export type SocketTopicMessagesReceiveAction = Record<PayloadName, Message>;
