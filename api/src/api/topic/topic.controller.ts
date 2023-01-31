import { Body, Get, Post, Query, Req } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ENTITY_NAME } from 'src/common/constant';
import { IsAuthController } from 'src/common/decorators';
import { RequestUser } from 'src/common/interfaces';
import { AccountRole } from '../account/account.interface';
import { Roles } from '../auth/roles.decorator';
import { TopicCreateDto, TopicGetByAdmin, TopicGetByUserDto } from './topic.dto';
import { TopicService } from './topic.service';

@IsAuthController(ENTITY_NAME.topic, 'Topic')
@Roles(AccountRole.ADMIN, AccountRole.USER)
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create new topic' })
  async createNewTopic(@Req() req: RequestUser, @Body() body: TopicCreateDto) {
    return await this.topicService.createTopic(req.user, body);
  }

  @Post('/my-topic')
  @ApiOperation({ summary: 'Get list topic of user' })
  async getMyTopic(@Req() req: RequestUser, @Query() query: TopicGetByUserDto) {
    return await this.topicService.getTopicOfUser(req.user, query);
  }
}

@IsAuthController(`admin/${ENTITY_NAME.topic}`, 'TopicAdmin')
@Roles(AccountRole.ADMIN)
export class TopicAdminController {
  constructor(private readonly topicService: TopicService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get list topics on system' })
  async getMyTopic(@Query() query: TopicGetByAdmin) {
    return await this.topicService.getTopicOnSystem(query);
  }
}
