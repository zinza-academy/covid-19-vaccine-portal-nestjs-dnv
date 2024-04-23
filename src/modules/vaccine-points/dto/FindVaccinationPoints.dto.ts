import { Type } from 'class-transformer';
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
  @Type(() => Number)
  page: number;

  @IsNotEmpty()
  @IsPositive()
  @Type(() => Number)
  pageSize: number;
}
