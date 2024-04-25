import { Body, Controller, Post, Request } from '@nestjs/common';
import { CreateVaccineRegistrationDto } from './dto/create-vaccine-registration.dto';
import { VaccinationRegistrationsService } from './vaccination-registrations.service';
import { IUser } from '../auth/interfaces';
import { User } from '../auth/decorators/user.decorator';

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
}
