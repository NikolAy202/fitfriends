import { Body, Controller, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UseridInterceptor } from './interceptors/userid.interceptor';
import { ApplicationServiceURL } from './app.config';
import { CreateTraningDto } from './dto/create-traning.dto';

@Controller('traning')
@UseFilters(AxiosExceptionFilter)
export class TraningController {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Post('/')
  public async create(@Body() dto: CreateTraningDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Traning}/create`, dto);
    return data;
  }

}
