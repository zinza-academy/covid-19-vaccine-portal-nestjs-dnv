import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VaccineRegistrations } from 'src/entities/vaccine-registrations.entity';
import { Repository } from 'typeorm';
import { CreateVaccineRegistrationDto } from './dto/create-vaccine-registration.dto';
import { IUser } from '../auth/interfaces';
import { Role } from '../auth/enums/role.enum';

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

  async findAll(user: IUser) {
    if (user.role === Role.Admin) {
      return this.vaccineRegistrationRepository.find();
    }

    return this.vaccineRegistrationRepository.find({
      where: {
        user: {
          id: user.userId,
        },
      },
    });
  }

  async findOne(id: number, user: IUser) {
    return 'one';
  }
}
