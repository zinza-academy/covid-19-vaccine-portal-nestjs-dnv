import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { CreateSampleVaccinePointDto } from './addSamplePoint.dto';
import { FindVaccinationPointsDto } from './dto/FindVaccinationPoints.dto';
import { CreateVaccinePointDto } from './dto/create-vaccine-point.dto';
import { UpdateVaccinePointDto } from './dto/update-vaccine-point.dto';
import { VaccinePointsService } from './vaccine-points.service';

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

  @Roles(Role.Admin)
  @Post()
  async createVaccinePoint(
    @Body() createVaccinePointDto: CreateVaccinePointDto,
  ) {
    return this.vaccinePointsService.createOne(createVaccinePointDto);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async updateVaccinePoint(
    @Param('id') id: number,
    @Body() updateVaccinePointDto: UpdateVaccinePointDto,
  ) {
    return await this.vaccinePointsService.updateOne(id, updateVaccinePointDto);
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
