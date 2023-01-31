/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { AccountHelper } from 'src/api/account/account.helper.service';
import { AccountRole, AccountStatus } from 'src/api/account/account.interface';
import { Account } from 'src/entities/account.entity';

@Injectable()
export class SeedingService implements OnModuleInit {
  constructor(private readonly accountHelper: AccountHelper) {}

  async onModuleInit() {
    await this.seedingAdmin();
  }

  async seedingAdmin() {
    try {
      const existAdmin = await this.accountHelper.findAccount({
        email: 'dulh181199@gmail.com',
        username: 'dusainbolt',
      });
      if (!existAdmin) {
        console.log('🚀 ~ file: seeding.service.ts ~ seedingAdmin');
        await this.accountHelper.insertAccount({
          email: 'dulh181199@gmail.com',
          username: 'dusainbolt',
          fullName: 'Lê Huy Du',
          password: '$2b$10$vVo8WJsK7b7SJJ4I5QCop.BBlIyhVb4VndSQvkTBgXfDyKcUyu/i.',
          status: AccountStatus.ACTIVE,
          role: AccountRole.ADMIN,
        });
      }
    } catch (e) {
      console.log('====Error seedingAdmin: ', e.toString());
    }
  }
}
