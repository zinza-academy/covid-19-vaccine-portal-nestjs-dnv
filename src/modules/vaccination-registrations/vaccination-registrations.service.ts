import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VaccineRegistrations } from 'src/entities/vaccine-registrations.entity';
import { Like, Repository } from 'typeorm';
import { CreateVaccineRegistrationDto } from './dto/create-vaccine-registration.dto';
import { IUser } from '../auth/interfaces';
import { Role } from '../auth/enums/role.enum';
import { FindVaccinationRegistrationsDto } from './dto/findVaccinationRegistration.dto';
import { UpdateVaccineRegistrationDto } from './dto/update-vaccine-registration.dto';

@Injectable()
export class VaccinationRegistrationsService {
  constructor(
    @InjectRepository(VaccineRegistrations)
    private vaccineRegistrationRepository: Repository<VaccineRegistrations>,
  ) {}

  async create(
    createVaccineRegistrationDto: CreateVaccineRegistrationDto,
    userId: number,
  ) {
    if (createVaccineRegistrationDto.user_id !== userId) {
      throw new UnauthorizedException(
        'User chỉ có thể tạo đăng ký cho chính mình',
      );
    }
    const vaccineRegistration = this.vaccineRegistrationRepository.create({
      ...createVaccineRegistrationDto,
      user: {
        id: userId,
      },
    });

    await this.vaccineRegistrationRepository.save(vaccineRegistration);

    return { msg: 'created' };
  }

  async findAll(user: IUser, findQuery: FindVaccinationRegistrationsDto) {
    const {
      page,
      pageSize,
      health_insurance_number = '',
      job = '',
    } = findQuery;

    if (user.role === Role.Admin) {
      return this.vaccineRegistrationRepository.find({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: {
          health_insurance_number: Like(`%${health_insurance_number}%`),
          job: Like(`%${job}%`),
        },
      });
    }

    return this.vaccineRegistrationRepository.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: {
        user: {
          id: user.userId,
        },
      },
      relations: {
        user: true,
      },
    });
  }

  async findOne(id: number) {
    const vaccineRegistration =
      await this.vaccineRegistrationRepository.findOneBy({
        id,
      });

    if (!vaccineRegistration) {
      throw new NotFoundException('Không tìm thấy kết quả đăng ký tiêm');
    }

    return vaccineRegistration;
  }

  async updateOne(
    id: number,
    updateVaccineRegistrationDto: UpdateVaccineRegistrationDto,
  ) {
    const vaccineRegistration =
      await this.vaccineRegistrationRepository.findOneBy({
        id,
      });
    if (!vaccineRegistration) {
      throw new NotFoundException(`vaccine registration not found`);
    }

    const { user_id, ...vaccineRegistrationWithoutId } =
      updateVaccineRegistrationDto;
    await this.vaccineRegistrationRepository.update(
      {
        id,
      },
      {
        ...vaccineRegistrationWithoutId,
        user: {
          id: user_id,
        },
      },
    );
    return { message: 'Update successful' };
  }
}
