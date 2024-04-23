import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateVaccinePointDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @Type(() => Number)
  ward_id: number;

  @IsNotEmpty()
  @IsString()
  manager: string;

  @IsNotEmpty()
  @IsPositive()
  @Transform((value) => parseInt(value.value))
  table_number: number;
}
