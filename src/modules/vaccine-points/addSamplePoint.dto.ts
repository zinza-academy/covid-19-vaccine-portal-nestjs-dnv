import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { District } from 'src/entities/districts.entity';

export class CreateSampleVaccinePointDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  district: District;

  @IsNotEmpty()
  @IsString()
  manager: string;

  @IsNotEmpty()
  @IsNumber()
  table_number: number;
}
