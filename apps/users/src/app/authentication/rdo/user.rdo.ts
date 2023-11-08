import { UserRole } from '@project/shared/app-types';
import { Expose, Transform } from 'class-transformer';

export class UserRdo {

  @Expose({ name: '_id'})
  @Transform(({obj}) => obj._id.toString())
  public id: string;


  @Expose()
  public avatar: string;


  @Expose()
  public dateBirth: string;


  @Expose()
  public email: string;

  @Expose()
  public userName: string;


  @Expose()
  public role: UserRole;


  @Expose()
  public merits?: string;

}
