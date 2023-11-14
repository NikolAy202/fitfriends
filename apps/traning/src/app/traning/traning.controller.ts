import { Body, Controller, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { TraningService } from './traning.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTraningDto } from './dto/create-traning.dto';
import { fillObject } from '@project/util/util-core';
import { TraningRdo } from './rdo/traning.rdo';
import { UpdateTraningDto } from './dto/update-traning.dto';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { TraningQueryDto } from './query/traning.query.dto';

@ApiTags('traning')
@Controller('traning')
export class TraningController {
  constructor(
    private readonly traningService: TraningService
  ) {}


  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new traning has been successfully created.'
  })
  @Post('create')
  public async create(@Body() dto: CreateTraningDto) {
    const newTraning = await this.traningService.create(dto);
    return fillObject(TraningRdo, newTraning);
  }

  @Post('update/:id')
  @ApiResponse({
    type: TraningRdo,
    status: HttpStatus.OK,
    description: 'User edit'
  })
  public async update(@Param('id', MongoidValidationPipe) id: string, @Body() dto: UpdateTraningDto) {
    console.log(id)
    const existTrainig = await this.traningService.update(id, dto);
    console.log(existTrainig)
      return fillObject(TraningRdo, existTrainig);

  }

  @Get(':id')
  @ApiResponse({
    type: TraningRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existTrainig = await this.traningService.show(id);
    return fillObject(TraningRdo, existTrainig);
  }

  @Get('show/list')
  @ApiResponse({
    type: TraningRdo,
    status: HttpStatus.OK,
    description: 'Show catalog training'
  })
  public async showCatalog(@Query() query: TraningQueryDto) {
    console.log(`в контроллере: ${query.sortPrice}`)
    const existTrainig = await this.traningService.showCatalog(query);
    return fillObject(TraningRdo, existTrainig);
  }

  @Get('show/trainer/list/:trainerId')
  @ApiResponse({
    type: TraningRdo,
    status: HttpStatus.OK,
    description: 'Show list training'
  })
  public async showCoachIdList(@Param('trainerId', MongoidValidationPipe) coachId: string, @Query() query: TraningQueryDto) {
    const existTrainig = await this.traningService.showList(coachId, query);
    return fillObject(TraningRdo, existTrainig);
  }
}
