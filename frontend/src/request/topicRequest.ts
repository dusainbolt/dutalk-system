import { GetMyTopicsDto, GetTopicDetailDto, GetTopicMessagesDto, TopicCreateDto } from '@type/topic';
import axios from './axios';

export class TopicRequest {
  static addTopic = async (body: TopicCreateDto) => {
    return await axios.post('/topic', body);
  };

  static getMyTopics = async (params: GetMyTopicsDto) => {
    return await axios.get('/topic/my-topic', params);
  };

  static getTopicDetail = async (params: GetTopicDetailDto) => {
    return await axios.get(`/topic/${params.topicId}`);
  };

  static getTopicMessages = async (params: GetTopicMessagesDto) => {
    return await axios.get(`/topic/${params.topicId}/messages`, params.query);
  };
}
