import { Injectable } from '@nestjs/common';
import { TraningRepository } from '../traning/traning.repository';
import { CreateTraningDto } from './dto/create-traning.dto';
import { TraningEntity } from './traning-entity';
import { UpdateTraningDto } from './dto/update-traning.dto';
import { TRANING_NOT_FOUND } from './traning.const';
import { TraningQueryDto } from './query/traning.query.dto';


@Injectable()
export class TraningService {

  constructor(
    private readonly traningRepository: TraningRepository
  ) {}

  public async create(dto: CreateTraningDto) {

    const traningEntity = await new TraningEntity(dto)

    return this.traningRepository
      .create(traningEntity);
  }

  public async update(id: string, dto: UpdateTraningDto) {
    console.log('12')
    const oldTraining = await this.traningRepository.findById(id);
    if (!oldTraining) {
      console.log('oldTraining')
      return {error: 'Traning not found'}
    }
    const training = {
      ...oldTraining,
      ...dto
    };

    const trainingEntity = new TraningEntity(training);
    return this.traningRepository.update(id, trainingEntity);
  }

  public async show(id: string) {
    const existTraining = await this.traningRepository.findById(id);
    if (!existTraining) {
      return {error: 'Traning not found'}
    }
    return existTraining;
  }

  public async showCatalog(query: TraningQueryDto) {
    const existTraining = await this.traningRepository.showCatalog(query);
    if (!existTraining) {
      return {error: TRANING_NOT_FOUND}
    }
    return existTraining;
  }


  public async showList(coachId: string, query: TraningQueryDto) {
    const existTraining = await this.traningRepository.findByTrainerId(coachId, query);
    if (!existTraining) {
      return {error: TRANING_NOT_FOUND}
    }
    return existTraining;
  }
}
