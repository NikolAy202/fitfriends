import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { SharedUser, User } from '@project/shared/app-types';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './user.model';
import { UserEntity } from './user.entity';


@Injectable()
export class UserRepository implements CRUDRepository<UserEntity, string, SharedUser> {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>)
     {
  }

  public async create(item: UserEntity): Promise<SharedUser> {

    const newUser = new this.userModel(item);
    return newUser.save();
  }

  public async destroy(id: string): Promise<void> {
    this.userModel.deleteOne({id});
  }

  public async findById(id: string): Promise<User | null> {
    return  this.userModel
      .findOne({_id: id})
      .exec();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.userModel
      .findOne({email})
      .exec();

    }

    public async update(id: string, item: UserEntity): Promise<User> {
      return this.userModel
        .findByIdAndUpdate(id, item.toObject(), {new: true})
        .exec();
    }
  }
