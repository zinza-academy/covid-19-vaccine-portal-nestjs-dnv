import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VaccinePoints } from 'src/entities/vaccine-points.entity';
import { Repository } from 'typeorm';
import { CreateSampleVaccinePointDto } from './addSamplePoint.dto';

@Injectable()
export class VaccinePointsService {
  constructor(
    @InjectRepository(VaccinePoints)
    private vaccinePointRepository: Repository<VaccinePoints>,
  ) {}

  async addFakeVaccinePoints(
    createSampleVaccinePointDto: CreateSampleVaccinePointDto[],
  ) {
    return await this.vaccinePointRepository.save(createSampleVaccinePointDto);
  }
}
