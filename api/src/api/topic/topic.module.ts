import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from 'src/entities/topic.entity';
import { MessageModule } from '../message/message.module';
import { TopicAdminController, TopicController } from './topic.controller';
import { TopicHelper } from './topic.helper.service';
import { TopicService } from './topic.service';

@Module({
  imports: [TypeOrmModule.forFeature([Topic]), MessageModule],
  providers: [TopicService, TopicHelper],
  controllers: [TopicController, TopicAdminController],
})
export class TopicModule {}
