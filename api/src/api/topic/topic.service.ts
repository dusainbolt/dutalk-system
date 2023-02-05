import { Injectable } from '@nestjs/common';
import { getDefaultQuery } from 'src/common/pagination';
import { Account } from 'src/entities/account.entity';
import { Message } from 'src/entities/message.entity';
import { Topic } from 'src/entities/topic.entity';
import { DeepPartial } from 'typeorm';
import { MessageHelper } from '../message/message.helper.service';
import { TopicCreateDto, TopicGetByAdmin, TopicGetByUserDto } from './topic.dto';
import { TopicHelper } from './topic.helper.service';

@Injectable()
export class TopicService {
  constructor(private readonly topicHelper: TopicHelper, private readonly messageHelper: MessageHelper) {}

  async createTopic(account: Account, data: TopicCreateDto) {
    await this.topicHelper.checkCorrectTitle(account.id, data.title);
    const newTopicData: DeepPartial<Topic> = {
      title: data.title,
      accountId: account.id,
    };
    const topic = await this.topicHelper.insertTopic(newTopicData);
    const firstMessage: DeepPartial<Message> = {
      content: data.description,
      accountId: account.id,
      topicId: topic.id,
    };
    const adminReplyMessage: DeepPartial<Message> = {
      content: `Chào ${account.fullName}, hệ thống đã nhận được tin nhắn của bạn. Quản trị viên sẽ trả lời bạn sớm!`,
      topicId: topic.id,
    };
    const messages = await this.messageHelper.insertMany([firstMessage, adminReplyMessage]);
    return await this.topicHelper.updateTopic(topic.id, { latestMessageId: messages[1].id });
  }

  async getTopicDetail(account: Account, topicId: number) {
    const topicByOwner = await this.topicHelper.checkOwnerTopic(account.id, topicId);
    return topicByOwner;
  }

  async getTopicsOfUser(account: Account, data: TopicGetByUserDto) {
    const { take, skip, order, ...options } = getDefaultQuery(data);
    return await this.topicHelper.findTopics(
      { accountId: account.id },
      { take, skip, order, relations: { latestMessage: data.includeLastMessage === 'true' } },
    );
  }

  async getTopicsOnSystem(data: TopicGetByAdmin) {
    const { take, skip, order, ...options } = getDefaultQuery(data);
    return await this.topicHelper.findTopics(
      {},
      { take, skip, order, relations: { latestMessage: data.includeLastMessage === 'true' } },
    );
  }

  async getMessagesOfTopic(account: Account, topicId: number, data: TopicGetByUserDto) {
    await this.topicHelper.checkOwnerTopic(account.id, topicId);
    const { take, skip, order, ...options } = getDefaultQuery(data);
    console.log('order: ', order);
    return await this.messageHelper.findMessages({ topicId }, { take, skip, order });
  }
}
