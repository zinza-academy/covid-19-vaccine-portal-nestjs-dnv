import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateSampleVaccinePointDto } from './addSamplePoint.dto';
import { VaccinePointsService } from './vaccine-points.service';
import { FindVaccinationPointsDto } from './dto/FindVaccinationPoints.dto';

@Controller('vaccine-points')
export class VaccinePointsController {
  constructor(private readonly vaccinePointsService: VaccinePointsService) {}

  @Get()
  async getVaccinePoints(
    @Query() findVaccinationPointParams: FindVaccinationPointsDto,
  ) {
    return this.vaccinePointsService.findAll(findVaccinationPointParams);
  }

  @Get(':id')
  async getOneVaccinePoints(@Param('id') id: number) {
    return this.vaccinePointsService.findOneById(id);
  }

  @Post()
  async addSampleVaccinePoints(
    @Body() createSampleVaccinePointDto: CreateSampleVaccinePointDto[],
  ) {
    await this.vaccinePointsService.addFakeVaccinePoints(
      createSampleVaccinePointDto,
    );
    return { message: 'import data successful' };
  }
}
