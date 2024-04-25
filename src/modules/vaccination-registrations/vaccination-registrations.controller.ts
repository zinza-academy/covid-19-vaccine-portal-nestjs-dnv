import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { User } from '../auth/decorators/user.decorator';
import { IUser } from '../auth/interfaces';
import { CreateVaccineRegistrationDto } from './dto/create-vaccine-registration.dto';
import { VaccinationRegistrationsService } from './vaccination-registrations.service';
import { FindVaccinationRegistrationsDto } from './dto/findVaccinationRegistration.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { UpdateVaccineRegistrationDto } from './dto/update-vaccine-registration.dto';

@Controller('vaccination-registrations')
export class VaccinationRegistrationsController {
  constructor(
    private readonly vaccineRegistrationService: VaccinationRegistrationsService,
  ) {}

  @Post()
  createVaccinationRegistration(
    @Body() createVaccineRegistrationDto: CreateVaccineRegistrationDto,
    @User() user: IUser,
  ) {
    const { userId } = user;

    return this.vaccineRegistrationService.create(
      createVaccineRegistrationDto,
      +userId,
    );
  }

  @Get()
  findAll(
    @Query() findVaccinationRegistrationParams: FindVaccinationRegistrationsDto,
    @User() user: IUser,
  ) {
    return this.vaccineRegistrationService.findAll(
      user,
      findVaccinationRegistrationParams,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.vaccineRegistrationService.findOne(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async updateVaccinationRegistration(
    @Param('id') id: number,
    @Body() updateVaccineRegistrationDto: UpdateVaccineRegistrationDto,
  ) {
    return this.vaccineRegistrationService.updateOne(
      id,
      updateVaccineRegistrationDto,
    );
  }
}
