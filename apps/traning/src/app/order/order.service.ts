import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create.order.dto";
import { OrderEntity } from "./order.enyity";
import { OrderRepository } from "./order.repository";
import { TraningRepository } from "../traning/traning.repository";
import { TRAINING_NOT_FOUND } from "./order.const";
import { UserBalanceRepository } from "../user-balance/user-balanse.repository";
import { UserBalanceEntity } from "../user-balance/user-balanse.entity";

@Injectable()
export class OrderService {

  constructor(
    private readonly traningRepository: TraningRepository,
    private readonly orderRepository: OrderRepository,
    private readonly userBalanceRepository: UserBalanceRepository

  ) {}

  public async create(dto: CreateOrderDto, trainingId: string) {
    const existTraining = await this.traningRepository.findById(trainingId);

    if (!existTraining) {
      throw new NotFoundException(TRAINING_NOT_FOUND)
    }

    const newOrder = {
      ...dto,
      //userId: userId,
      trainerId: existTraining.trainer,
      orderType: 'Абонемент',
      price: existTraining.price,
      totalPrice: existTraining.price*dto.trainingCount}

    const orderEntity = await new OrderEntity({...newOrder, trainingId})

    const order = await this.orderRepository
      .create(orderEntity);

    // const NewBalance = {
    //   userId: dto.userId,
    //   trainingId: trainingId,
    //   trainingCount: dto.trainingCount

    // }

    const userBalanceEntity = new UserBalanceEntity({...newOrder, trainingId})


    await this.userBalanceRepository.create(userBalanceEntity)

    return order
  }

  public async showListByTrainer(trainerId: string) {
    return await this.orderRepository.findByTrainerId(trainerId);
  }
}


