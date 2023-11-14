import { Injectable } from "@nestjs/common";
import { CRUDRepository } from '@project/util/util-types';
import { TraningEntity } from "./traning-entity.js";
import { Traning } from "@project/shared/app-types";
import { InjectModel } from "@nestjs/mongoose";
import { TraningModel } from "./traning.model";
import { Model } from "mongoose";
import { TrainingQuery } from "./query/trning.query";
import { TraningQueryDto } from "./query/traning.query.dto";

@Injectable()
export class TraningRepository implements CRUDRepository<TraningEntity, string, Traning> {

  constructor(
    @InjectModel(TraningModel.name) private readonly trainingModel: Model<TraningModel>) {
  }

  public async create(item: TraningEntity): Promise<Traning> {
    const newTraning = new this.trainingModel(item);
    return newTraning.save();
  }

  public async update(id: string, item: TraningEntity): Promise<Traning> {
    return this.trainingModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }

  public async destroy(id: string): Promise<void>  {
    this.trainingModel.deleteOne({id});
  }

  public async findById(id: string): Promise<Traning | null> {
    console.log(id)
    return this.trainingModel
      .findOne({_id: id})
      .exec();
  }

  public async updateRating(id: string, newRating: number): Promise<Traning> {
    console.log('в traning норм все')
    return this.trainingModel
      .findByIdAndUpdate(id, {rating: newRating}, {new: true})
      .exec();
  }

  public async showCatalog(query: TraningQueryDto): Promise<Traning[]> {
    const queryObj = new TrainingQuery(query).toObject()
    console.log(queryObj)
     return this.trainingModel
     .find(queryObj.filter)
     .sort(queryObj.sort)
     .limit(queryObj.limit)
     .exec();
   }

   public async findByTrainerId(trainerId: string, query: TraningQueryDto): Promise<Traning[]> {
    const queryObj = new TrainingQuery(query).toObject()

    return this.trainingModel
    .find({...queryObj.filter, trainer: trainerId})
    .sort(queryObj.sort)
    .limit(queryObj.limit)
    .exec();
  }
}
