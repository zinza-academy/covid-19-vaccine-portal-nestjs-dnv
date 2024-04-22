import { Transform } from 'class-transformer';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Ward } from 'src/entities/wards.entity';

export class CreateVaccinePointDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @Transform((value) => parseInt(value.value))
  ward: Ward;

  @IsNotEmpty()
  @IsString()
  manager: string;

  @IsNotEmpty()
  @IsPositive()
  @Transform((value) => parseInt(value.value))
  table_number: number;
}
