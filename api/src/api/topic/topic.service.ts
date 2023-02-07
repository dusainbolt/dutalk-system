import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ADMIN_ID } from 'src/common/constant';
import { getDefaultQuery } from 'src/common/pagination';
import { Account } from 'src/entities/account.entity';
import { Message } from 'src/entities/message.entity';
import { Topic } from 'src/entities/topic.entity';
import { AppGateway } from 'src/gatewaies/app.gateway';
import { SocketService } from 'src/gatewaies/socket.service';
import { DeepPartial } from 'typeorm';
import { AccountHelper } from '../account/account.helper.service';
import { MessageHelper } from '../message/message.helper.service';
import { TopicCreateDto, TopicGetByAdmin, TopicGetByUserDto, TopicGetDetailDto } from './topic.dto';
import { TopicHelper } from './topic.helper.service';

@Injectable()
export class TopicService {
  constructor(
    private readonly topicHelper: TopicHelper,
    private socketService: SocketService,
    private readonly messageHelper: MessageHelper,
    private readonly accountHelper: AccountHelper, // private readonly appGateWay: AppGateway,
  ) {}

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
      accountId: ADMIN_ID,
    };
    const messages = await this.messageHelper.insertMany([firstMessage, adminReplyMessage]);
    const topicUpdate = await this.topicHelper.updateTopic(topic.id, { latestMessageId: messages[1].id });
    this.socketService.socket.emit('topic_received_admin', {
      ...topicUpdate,
      account: account,
      latestMessage: messages[1],
    } as Topic);

    return topicUpdate;
  }

  async getTopicDetail(account: Account, topicId: number, query: TopicGetDetailDto) {
    const topicByOwner = await this.topicHelper.checkOwnerTopic(account.id, topicId);
    if (query.account === 'true') {
      topicByOwner.account = await this.accountHelper.findAccount({ id: topicByOwner.accountId });
    }
    return topicByOwner;
  }

  async getTopicsOfUser(account: Account, data: TopicGetByUserDto) {
    const { take, skip, order, ...options } = getDefaultQuery(data);
    return await this.topicHelper.findTopics(
      { accountId: account.id },
      {
        take,
        skip,
        order,
        relations: { latestMessage: data.lastMessage === 'true', account: data.account === 'true' },
      },
    );
  }

  async getTopicsOnSystem(data: TopicGetByAdmin) {
    const { take, skip, order, ...options } = getDefaultQuery(data);
    return await this.topicHelper.findTopics(
      {},
      {
        take,
        skip,
        order,
        relations: { latestMessage: data.lastMessage === 'true', account: data.account === 'true' },
      },
    );
  }

  async getMessagesOfTopic(account: Account, topicId: number, data: TopicGetByUserDto) {
    await this.topicHelper.checkOwnerTopic(account.id, topicId);
    const { take, skip, order, ...options } = getDefaultQuery(data);
    return await this.messageHelper.findMessages({ topicId }, { take, skip, order });
  }
}
