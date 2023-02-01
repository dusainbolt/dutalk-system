export type Message = {
  id: number;
  content: string;
  accountId: number;
  topicId: number;
  latestMessageId: number;
  createdOn: string;
  updatedOn: string;
};

// export type InputTopic = {
//   title: string;
//   description: string;
// };

// export interface GetMyTopicsDto extends IPaginationQuery {
//   includeLastMessage?: string;
// }

// export type TopicCreateDto = InputTopic;

// export type TopicSlice = {
//   // state logic
//   newTopicId?: number;
//   loadingAddTopic?: boolean;
//   loadingGetTopics?: boolean;
//   errorAddTopic?: AppError;
//   errorGetTopics?: AppError;
//   // data
//   listTopics?: Topic[];
// };
