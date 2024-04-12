import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsEmail,
  MinLength,
  IsNumberString,
  IsDateString,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { Gender } from 'src/entities/users.entity';
import { Ward } from 'src/entities/wards.entity';

export class SignUpDto {
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
  @IsNumber()
  ward: Ward;

  @IsOptional()
  @IsBoolean()
  isAdmin: boolean;
}
