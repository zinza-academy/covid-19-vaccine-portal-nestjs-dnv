import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '../auth/decorators/user.decorator';
import { IUser } from '../auth/interfaces';
import { CreateVaccineRegistrationDto } from './dto/create-vaccine-registration.dto';
import { VaccinationRegistrationsService } from './vaccination-registrations.service';

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
  findAll(@User() user: IUser) {
    return this.vaccineRegistrationService.findAll(user);
  }
}
