import { Module } from '@nestjs/common';
import { VaccinationRegistrationsController } from './vaccination-registrations.controller';
import { VaccinationRegistrationsService } from './vaccination-registrations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaccineRegistrations } from 'src/entities/vaccine-registrations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VaccineRegistrations])],
  controllers: [VaccinationRegistrationsController],
  providers: [VaccinationRegistrationsService],
})
export class VaccinationRegistrationsModule {}
