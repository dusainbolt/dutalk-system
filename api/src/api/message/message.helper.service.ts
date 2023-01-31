import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/entities/message.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class MessageHelper {
  constructor(@InjectRepository(Message) private messageRepo: Repository<Message>) {}

  async insertMany(data: DeepPartial<Message>[]): Promise<Message[]> {
    return await this.messageRepo.save(data);
  }

  async insertMessage(data: DeepPartial<Message>): Promise<Message> {
    return await this.messageRepo.save(data);
  }
}
