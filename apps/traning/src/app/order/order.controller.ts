import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { OrderService } from "./order.service";
import { Body, Controller, HttpStatus, Param, Post } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create.order.dto";
import { fillObject } from "@project/util/util-core";
import { OrderRdo } from "./rdo/order.rdo";

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.'
  })
  @Post('create/:trainingId')
  public async create(@Param('trainingId') trainingId: string, @Body() dto: CreateOrderDto) {

    const newComment = await this.orderService.create(dto, trainingId);
  console.log(newComment)

    return fillObject(OrderRdo, newComment);
  }

}
