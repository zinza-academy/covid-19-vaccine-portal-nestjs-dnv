import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateVaccineRegistrationDto {
  @IsNotEmpty()
  @IsString()
  priorityType: string;

  @IsNotEmpty()
  @IsString()
  job: string;

  @IsString()
  workplace: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsDateString()
  @IsNotEmpty()
  appointmentDate: string;

  @IsNotEmpty()
  @IsString()
  desired_date: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(15)
  health_insurance_number: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
