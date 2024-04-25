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
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  priorityType: number;

  @Type(() => Number)
  @IsNumber()
  job: number;

  @IsString()
  workplace: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsDateString()
  @IsNotEmpty()
  appointmentDate: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  desired_date: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(15)
  health_insurance_number: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
