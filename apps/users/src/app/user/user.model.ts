import { Document, Schema as MongooseSchema} from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User, UserRole, Location, TrainingLevel, TypeTraining, TimeTraining } from '@project/shared/app-types';
import { UserGender } from '@project/shared/app-types';

@Schema({
  collection: 'client',
  timestamps: true,
})
export class UserModel extends Document implements User {
  @Prop()
  public avatar: string;

  @Prop({
    required: true,
  })
  public dateBirth: Date;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public userName: string;

  @Prop({
    required: true,
  })
  public description: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.User,
  })
  public role: UserRole;


  @Prop({
    required: true,
  })
  public caloriesBurnedTraining: number;

  @Prop({
    required: true,
  })
  public trainingReadiness: boolean;

  @Prop({
    required: true,
  })
  public caloriesBurnedDay: number;

  @Prop({
    required: true,
    type: String,
    enum: TrainingLevel,
    default: TrainingLevel.Beginner,
  })
  public trainingLevel: TrainingLevel;


  @Prop({
    type: MongooseSchema.Types.Array
  })
  public typeTraining: TypeTraining[];


  @Prop({
    required: true,
    type: String,
    enum: TimeTraining,
    default: TimeTraining.Time30
  })
  public timeTraining: TimeTraining;
  @Prop({
    required: true,
    type: String,
    enum: Location
  })
  public location: Location;

  @Prop()
  public image: string;


  @Prop({
    required: true,
    type: String,
    enum: UserGender,
  })
  public gender: UserGender


}

export const UserSchema = SchemaFactory.createForClass(UserModel);
