import { TimeTraining, TrainingLevel, TypeTraining, User, UserRole} from '@project/shared/app-types'
import { UserGender } from 'shared/app-types/src/lib/user-gender.enum';
import { Location } from 'shared/app-types/src/lib/location.enum';
import {  compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './user.const';

export class UserEntity implements User{
    public _id: string;
    public userName: string;
    public email: string;
    public avatar: string;
    public passwordHash: string;
    public gender: UserGender;
    public dateBirth: Date;
    public role: UserRole;
    public description: string;
    public location: Location;
    public image: string;
    public trainingLevel: TrainingLevel;
    public typeTraining: TypeTraining;
    public timeTraining: TimeTraining;
    public caloriesBurnedTraining: number;
    public caloriesBurnedDay: number;
    public trainingReadiness: boolean

    constructor(userEntity: User) {
      this.fillEntity(userEntity);
    }

    public toObject() {
      return {...this};
    }

    public fillEntity(userEntity: User) {
      this._id = userEntity._id;
      this.userName = userEntity.userName;
      this.email = userEntity.email;
      this.avatar = userEntity.avatar;
      this.passwordHash = userEntity.passwordHash;
      this.gender = userEntity.gender;
      this.dateBirth = userEntity.dateBirth;
      this.role = userEntity.role;
      this.description = userEntity.description;
      this.location = userEntity.location;
      this.image = userEntity.image;
      this.trainingLevel = userEntity.trainingLevel;
      this.typeTraining = userEntity.typeTraining;
      this.timeTraining = userEntity.timeTraining;
      this.caloriesBurnedTraining = userEntity.caloriesBurnedTraining;
      this.caloriesBurnedDay = userEntity.caloriesBurnedDay;
      this.trainingReadiness = userEntity.trainingReadiness;
    }

    public async setPassword(password: string): Promise<UserEntity> {
      const salt = await genSalt(SALT_ROUNDS);
      this.passwordHash = await hash(password, salt);
      return this;
    }

    public async comparePassword(password: string): Promise<boolean> {
      return compare(password, this.passwordHash);
    }
}
