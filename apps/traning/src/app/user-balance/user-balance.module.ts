import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserBalanceRepository } from './user-balanse.repository';
import { UserBalanceModel, UserBalanceSchema } from './user-balance.model';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserBalanceModel.name, schema: UserBalanceSchema }]),
  ],
  providers: [UserBalanceRepository],
  exports: [UserBalanceRepository],
})
export class UserBalanceModule {}
