import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VaccinePoints } from 'src/entities/vaccine-points.entity';
import { Like, Repository } from 'typeorm';
import { CreateSampleVaccinePointDto } from './addSamplePoint.dto';
import { FindVaccinationPointsDto } from './dto/FindVaccinationPoints.dto';

@Injectable()
export class VaccinePointsService {
  constructor(
    @InjectRepository(VaccinePoints)
    private vaccinePointRepository: Repository<VaccinePoints>,
  ) {}

  async findAll(findQuery: FindVaccinationPointsDto) {
    const { page, pageSize, ward, district, province, name, address } =
      findQuery;
    return this.vaccinePointRepository.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
      relations: {
        ward: {
          district: {
            province: true,
          },
        },
      },
      where: {
        name: Like(`%${name}%`),
        address: Like(`%${address}%`),
        ward: {
          name: Like(`%${ward}%`),
          district: {
            name: Like(`%${district}%`),
            province: {
              name: Like(`%${province}%`),
            },
          },
        },
      },
    });
  }

  async addFakeVaccinePoints(
    createSampleVaccinePointDto: CreateSampleVaccinePointDto[],
  ) {
    return await this.vaccinePointRepository.save(createSampleVaccinePointDto);
  }
}
