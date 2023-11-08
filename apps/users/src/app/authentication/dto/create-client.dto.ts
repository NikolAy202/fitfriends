import { UserGender } from "shared/app-types/src/lib/user-gender.enum";
import { Location } from "shared/app-types/src/lib/location.enum";
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEnum, IsISO8601, IsInt, IsString, Length, Min } from "class-validator";
import { TimeTraining, TrainingLevel, TypeTraining, UserRole } from "@project/shared/app-types";

export class CreateClientDto {

  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  @IsEnum(TrainingLevel, {message: 'email must be valid address'})
  public trainingLevel: TrainingLevel;


  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  @IsEnum(TypeTraining, {message: 'email must be valid address'})
  public typeTraining: TypeTraining;


  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  @IsEnum(TimeTraining, {message: 'email must be valid address'})
  public timeTraining: TimeTraining;

  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  @IsInt()
  public caloriesBurnedTraining: number;

  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  @IsInt()
  @Min(0, {message: 'Minimum calories is 0'})
  public caloriesBurnedDay: number;

  @IsBoolean()
  public trainingReadiness: boolean;
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  @IsEmail({}, {message: 'email must be valid address'})
  public email: string;

  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12',
  })
  @IsISO8601({}, { message: 'The user date birth is not valid' })
  public dateBirth: string;

  @ApiProperty({
    description: 'User name',
    example: 'Keks',
  })
  @IsString()
  @Length(1, 15, {message: 'Min length name is 1, max is 15'})
  public userName: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString({message: 'password is required'})
  @Length(6, 12, {message: 'Min length for password is 6, max is 12'})
  public password: string;

  @ApiProperty({
    description: 'User gender',
    example: 'male'
  })
  @IsEnum(UserGender, {message: 'type must be one of male, female or no matter'})
  public gender: UserGender;

  @ApiProperty({
    description: 'User avatar',
    example: 'upload/avatar12'
  })
  @IsString()
  public avatar: string;

  @ApiProperty({
    description: 'User role',
    example: 'user'
  })
  @IsEnum(UserRole, {message: 'type must be one of user or trainer'})
  public role: UserRole;

  @ApiProperty({
    description: 'Text with general information',
    example: 'Хороший кот ищет товарищей для тренировки'
  })
  @IsString()
  @Length(10, 140, {message: 'Min length text is 10, max is 140'})
  public description: string;

  @ApiProperty({
    description: 'Metro station',
    example: 'Пионерская'
  })
  @IsEnum(Location)
  public location: Location;

  @ApiProperty({
    description: 'Background image for the users card',
    example: 'upload/image/user12/21'
  })
  @IsString()
  public image: string;
}