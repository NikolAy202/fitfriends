import { TrainingLevel, TypeTraining, Location, UserRole, UserGender, Trainer } from "@project/shared/app-types";
import { compare, genSalt, hash } from "bcrypt";
import { SALT_ROUNDS } from "./trainer.const";

export class TrainerEntity implements Trainer {
public trainingLevel: TrainingLevel;
public typeTraining: TypeTraining[];
public certificates: string;
public merits: string;
public personalTraining: boolean
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

constructor(userEntity: Trainer) {
  this.fillEntity(userEntity);
}

public toObject() {
  return {...this};
}

public fillEntity(userEntity: Trainer) {
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
  this.certificates =userEntity.certificates;
  this.merits = userEntity.merits;
  this.personalTraining = userEntity.personalTraining;
  this.typeTraining = userEntity.typeTraining;
}

public async setPassword(password: string): Promise<TrainerEntity> {
  const salt = await genSalt(SALT_ROUNDS);
  this.passwordHash = await hash(password, salt);
  return this;
}

public async comparePassword(password: string): Promise<boolean> {
  return compare(password, this.passwordHash);
}
}
