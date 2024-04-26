import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class FindVaccinationRegistrationsDto {
  @IsOptional()
  health_insurance_number?: string;

  @IsOptional()
  job?: string;

  @IsNotEmpty()
  @IsPositive()
  @Type(() => Number)
  page: number;

  @IsNotEmpty()
  @IsPositive()
  @Type(() => Number)
  pageSize: number;
}
