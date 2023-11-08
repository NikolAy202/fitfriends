import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import {
  ConfigUsersModule,
  getMongooseOptions,
} from '@project/config/config-users';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifyModule } from './notify/notify.module';
import { TrainerModule } from './trainer/trainer.module';


@Module({
  imports: [
    AuthenticationModule,
    UserModule,
    TrainerModule,
    ConfigUsersModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
    NotifyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
