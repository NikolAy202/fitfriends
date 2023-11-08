import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import dbConfig from './db.config';

const ENV_TRANING_FILE_PATH = 'apps/traning/.traning.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, dbConfig],
      envFilePath: ENV_TRANING_FILE_PATH
    }),
  ]
})
export class ConfigTraningModule {}
