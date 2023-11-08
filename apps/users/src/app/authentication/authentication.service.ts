import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { BaseUser } from '@project/shared/app-types';
import dayjs from 'dayjs';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG, USER_ROLE } from './authentication.const';
import { LoginUserDto } from './dto/login-user.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from '@project/config/config-users';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import * as crypto from 'node:crypto';
import { createJWTPayload } from '@project/util/util-core';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserEntity } from '../user/user.entity';
import { TrainerEntity } from '../trainer/trainer.entity';
import { TrainerRepository } from '../trainer/trainer.repository';


@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly trainerRepository: TrainerRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,

    @Inject (jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
  ) {}

  public async register(dto: CreateUserDto) {
    const {email, dateBirth, password} = dto;

    const user = { ...dto, dateBirth: dayjs(dateBirth).toDate(),
      passwordHash: '',
    };

    const existUser = await this.userRepository.findByEmail(email);
    const existTrainer = await this.trainerRepository.findByEmail(email);

    if (existUser || existTrainer) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    if (dto.role === USER_ROLE.Trainer) {

      const trainerEntity = await new TrainerEntity(user).setPassword(password);

      return this.trainerRepository
      .create(trainerEntity);
    }

    const userEntity = await new UserEntity(user)
      .setPassword(password)

    return this.userRepository
      .create(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.userRepository.findByEmail(email);
    const existTrainer = await this.trainerRepository.findByEmail(email);

    if (!existUser && !existTrainer) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }


    if (existUser ) {
      if (existUser.role === USER_ROLE.User) {
        const userEntity = new UserEntity(existUser);
        if (!await userEntity.comparePassword(password)) {
          throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
        }

        return userEntity.toObject();
      }
    }

    const trainerEntity = new TrainerEntity(existTrainer);
    if (!await trainerEntity.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return trainerEntity.toObject();
  }

  public async getUser(id: string) {
    const user = await this.userRepository.findById(id);
     if (!user) {
      return this.trainerRepository.findById(id)
     }
    return user
  }

  public async createUserToken(user: BaseUser) {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload)

    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      })
    }
  }
}
