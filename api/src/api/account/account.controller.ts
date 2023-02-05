import { Get, Req } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ENTITY_NAME } from 'src/common/constant';
import { IsAuthController } from 'src/common/decorators';
import { RequestUser } from 'src/common/interfaces';
import { Roles } from '../auth/roles.decorator';
import { AccountRole } from './account.interface';
import { AccountService } from './account.service';

@IsAuthController(ENTITY_NAME.ACCOUNT, 'Account')
@Roles(AccountRole.ADMIN, AccountRole.USER)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get account info' })
  async getAccountInfo(@Req() req: RequestUser) {
    return { account: req.user };
  }
}
