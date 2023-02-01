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

export type TopicCreateDto = InputTopic;

export type TopicSlice = {
  // state logic
  newTopicId?: number;
  loadingAddTopic?: boolean;
  loadingGetTopics?: boolean;
  errorAddTopic?: AppError;
  errorGetTopics?: AppError;
  // data
  listTopics?: Topic[];
};
