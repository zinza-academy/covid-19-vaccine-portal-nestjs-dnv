import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class FindVaccinationPointsDto {
  @IsOptional()
  province?: string;

  @IsOptional()
  district?: string;

  @IsOptional()
  ward?: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  address?: string;

  @IsNotEmpty()
  @IsPositive()
  @Transform((value) => parseInt(value.value))
  page: number;

  @IsNotEmpty()
  @IsPositive()
  @Transform((value) => parseInt(value.value))
  pageSize: number;
}
