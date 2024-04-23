import { PartialType } from '@nestjs/mapped-types';
import { CreateVaccinePointDto } from './create-vaccine-point.dto';

export class UpdateVaccinePointDto extends PartialType(CreateVaccinePointDto) {}
