import { Body, Controller, Param, Patch, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { TrainerIdInterceptor } from './interceptors/trainer-id.interceptor';
import { ApplicationServiceURL } from './app.config';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { CreateTraningDto, UpdateTraningDto } from '@project/shared/shared-dto';

@Controller('traning')
@UseFilters(AxiosExceptionFilter)
export class TraningController {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(TrainerIdInterceptor)
  @Post('/')
  public async create(@Body() dto: CreateTraningDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Traning}/create`, dto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(TrainerIdInterceptor)
  @Patch('/')
  public async update(@Body() dto: UpdateTraningDto, @Param('id', MongoidValidationPipe) id: string) {
    console.log(dto)
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Traning}/update/${id}`, dto);
    return data;
  }


}
