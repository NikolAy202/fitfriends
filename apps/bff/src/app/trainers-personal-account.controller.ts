import { Body, Controller, Get, Param, Post, Query, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { ApplicationServiceURL } from './app.config';
import { CreateTraningDto } from './dto/create-traning.dto';
import { RoleTrainerInterceptor } from './interceptors/role-trainer.interseptor';
import { UpdateTraningDto } from './dto/update-traning.dto';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { UseridTrainingInterceptor } from './interceptors/user-id.taining.interseptor';
import { TraningQueryDto } from '@project/shared/shared-query'
import { RequestWithTokenPayload } from '@project/shared/app-types';
import { TrainerIdInterceptor } from './interceptors/trainer-id.interceptor';

@Controller('trainer')
@UseFilters(AxiosExceptionFilter)
export class TrainerController {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  //Создать тренировку
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleTrainerInterceptor)
  @UseInterceptors(TrainerIdInterceptor)
  @Post('/')
  public async createTraining(@Body() dto: CreateTraningDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Traning}/create`, dto);
    return data;
  }

  //Редактировать тренировку
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(TrainerIdInterceptor)
  @UseInterceptors(RoleTrainerInterceptor)
  @UseInterceptors(UseridTrainingInterceptor)
  @Post('update/:id')
  public async update(@Body() dto: UpdateTraningDto, @Param('id', MongoidValidationPipe) id: string) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Traning}/update/${id}`, dto);
   return data;
  }

  //Детальная информация о тренеровке
  @UseGuards(CheckAuthGuard)
  @Get('training/:id')
  public async show(@Req() req: Request, @Param('id', MongoidValidationPipe) id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Traning}/${id}`);
    return data;
  }

  //Список тренеровок тренера
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleTrainerInterceptor)
  @Get('training/show/list')
  public async showList(@Req() { user: payload }: RequestWithTokenPayload, @Query() query: TraningQueryDto) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Traning}/trainer/list/${payload.sub}`, {params : query});
   return data;
  }

  //Список друзей тренера
  @UseGuards(CheckAuthGuard)
  @Get('friends')
  public async showFriends(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/friends`, {
      headers: {
      'Authorization': req.headers['authorization'],
      }
  })
  return data;
}

  //Список заказов тренера
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleTrainerInterceptor)
  @Get('orders')
  public async showOrders(@Req() { user: payload }: RequestWithTokenPayload,) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Orders}/show/list/${payload.sub}`, {
  })
  return data;
  }

}
