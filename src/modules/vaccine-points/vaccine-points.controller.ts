import {
  Body,
  Controller,
  Get,
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
