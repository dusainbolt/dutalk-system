import { PayloadName } from '@redux/reducer';
import { Message } from '@type/message';
import { SocketTopicMessagesReceiveDto } from '@type/socket';
import {
  GetMyTopicsDto,
  GetSystemTopicsDto,
  GetTopicDetailDto,
  GetTopicMessagesDto,
  InputTopic,
  Topic,
} from '@type/topic';

export type AddTopicStartAction = Record<PayloadName, InputTopic>;
export type AddTopicSuccessAction = Record<PayloadName, Topic>;
export type GetMyTopicsStartAction = Record<PayloadName, GetMyTopicsDto>;
export type GetMyTopicsSuccessAction = Record<PayloadName, Topic[]>;
export type GetSystemTopicsStartAction = Record<PayloadName, GetSystemTopicsDto>;
export type GetSystemTopicsSuccessAction = Record<PayloadName, Topic[]>;
export type GetTopicDetailStartAction = Record<PayloadName, { topicId: string; query: GetTopicDetailDto }>;
export type GetTopicDetailSuccessAction = Record<PayloadName, Topic>;
export type GetTopicMessagesStartAction = Record<PayloadName, GetTopicMessagesDto>;
export type GetTopicMessagesSuccessAction = Record<PayloadName, Message[]>;
export type SocketTopicMessagesReceiveAction = Record<PayloadName, SocketTopicMessagesReceiveDto>;
export type SocketNewTopicReceiveAction = Record<PayloadName, Topic>;
