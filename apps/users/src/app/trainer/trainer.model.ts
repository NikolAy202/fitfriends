import { Document, Schema as MongooseSchema} from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole, Location, TrainingLevel, TypeTraining, Trainer } from '@project/shared/app-types';
import { UserGender } from '@project/shared/app-types';

@Schema({
  collection: 'trainer',
  timestamps: true,
})
export class TrainerModel extends Document implements Trainer {
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
    default: UserRole.Trainer,
  })
  public role: UserRole;


  @Prop({
    required: true,
  })
  public merits: string;

  @Prop({
    required: true,
  })
  public personalTraining: boolean;

  @Prop({
    required: true,
  })
  public certificates: string;

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

export const TrainerSchema = SchemaFactory.createForClass(TrainerModel);
