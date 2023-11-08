import { Module } from '@nestjs/common';
import { TraningController } from './traning.controller';
import { TraningService } from './traning.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TraningModel, TraningSchema } from './traning.model';
import { TraningRepository } from './traning.repository';

@Module({
  imports: [MongooseModule.forFeature([
    { name: TraningModel.name, schema: TraningSchema }
  ])],
  controllers: [TraningController],
  providers: [TraningService, TraningRepository],
  exports: [TraningRepository, TraningService]
})
export class TraningModule {}
