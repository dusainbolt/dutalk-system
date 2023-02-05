import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from 'src/api/account/account.module';
import { MessageModule } from 'src/api/message/message.module';
import { TopicModule } from 'src/api/topic/topic.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    AccountModule,
    TopicModule,
    MessageModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('jwt.secretKey'),
          signOptions: {
            expiresIn: config.get('jwt.expireIns'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AppGateway],
  controllers: [],
})
export class GatewayModules {}
