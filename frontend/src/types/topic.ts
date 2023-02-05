import { AppError, IPaginationQuery } from './context';
import { Message } from './message';

export type Topic = {
  id: number;
  title: string;
  accountId: number;
  latestMessageId: number;
  createdOn: string;
  updatedOn: string;
  latestMessage?: Message;
};

export type InputTopic = {
  title: string;
  description: string;
};

export interface GetMyTopicsDto extends IPaginationQuery {
  includeLastMessage?: string;
}

export interface GetTopicDetailDto {
  topicId?: string;
}

export interface GetTopicMessagesDto {
  topicId?: string;
  query?: IPaginationQuery;
}

export type TopicCreateDto = InputTopic;

export type TopicSlice = {
  // state logic
  newTopicId?: number;
  loadingAddTopic?: boolean;
  loadingGetTopic?: boolean;
  loadingGetTopics?: boolean;
  loadingGetTopicMessages?: boolean;
  errorAddTopic?: AppError;
  errorGetTopic?: AppError;
  errorGetTopics?: AppError;
  errorGetTopicMessages?: AppError;
  // data
  listTopics?: Topic[];
  topic?: Topic;
  topicMessages?: Message[];
};
