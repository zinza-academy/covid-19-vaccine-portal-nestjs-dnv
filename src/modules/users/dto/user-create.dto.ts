import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Gender } from '../../../entities/users.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MaxLength(12)
  @IsNumberString()
  citizenId: string;

  @IsDateString()
  dateOfBirth: string;

  @IsEnum(Gender)
  gender: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsPositive()
  ward_id: number;
}
