import { Module } from '@nestjs/common';
import { TraningModule } from './traning/traning.module';
import { ConfigTraningModule, getMongooseOptions } from '@project/config/config-traning';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentModule } from './comments/comments.module';

@Module({
  imports: [
    TraningModule,
    CommentModule,
    ConfigTraningModule,
    MongooseModule.forRootAsync(
      getMongooseOptions())],
  controllers: [],
  providers: [],
})
export class AppModule {}
