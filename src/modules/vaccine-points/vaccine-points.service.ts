import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VaccinePoints } from 'src/entities/vaccine-points.entity';
import { Like, Repository } from 'typeorm';
import { CreateSampleVaccinePointDto } from './addSamplePoint.dto';
import { FindVaccinationPointsDto } from './dto/FindVaccinationPoints.dto';
import { CreateVaccinePointDto } from './dto/create-vaccine-point.dto';
import { UpdateVaccinePointDto } from './dto/update-vaccine-point.dto';

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

  async findOneById(id: number) {
    const vaccinePoint = await this.vaccinePointRepository.findOne({
      relations: {
        ward: {
          district: {
            province: true,
          },
        },
      },
      where: {
        id,
      },
    });
    if (!vaccinePoint) {
      throw new NotFoundException(`vaccine point with id: ${id} not found`);
    }

    return vaccinePoint;
  }

  async updateOne(id: number, updateVaccinePointDto: UpdateVaccinePointDto) {
    const vaccinePoint = await this.vaccinePointRepository.findOneBy({
      id,
    });
    if (!vaccinePoint) {
      throw new NotFoundException(`vaccine point with id: ${id} not found`);
    }
    if (Object.keys(updateVaccinePointDto).length === 0) {
      throw new BadRequestException('Empty update data');
    }

    await this.vaccinePointRepository.update(
      {
        id,
      },
      {
        ...updateVaccinePointDto,
      },
    );
    return { message: 'Update successful' };
  }

  async createOne(createVaccinePointDto: CreateVaccinePointDto) {
    const vaccinePoint = await this.vaccinePointRepository.create({
      ...createVaccinePointDto,
      ward: {
        id: createVaccinePointDto.ward_id,
      },
    });
    return await this.vaccinePointRepository.save(vaccinePoint);
  }

  async addFakeVaccinePoints(
    createSampleVaccinePointDto: CreateSampleVaccinePointDto[],
  ) {
    return await this.vaccinePointRepository.save(createSampleVaccinePointDto);
  }
}
