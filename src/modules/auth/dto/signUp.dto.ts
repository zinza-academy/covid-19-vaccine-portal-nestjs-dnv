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
  Length,
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

  @IsNotEmpty()
  @Length(12, 12)
  @IsNumberString()
  citizenId: string;

  @IsDateString()
  dateOfBirth: string;

  @IsEnum(Gender)
  gender: string;

  @IsOptional()
  refreshToken: string;

  @IsNotEmpty()
  @IsNumber()
  ward: Ward;

  @IsOptional()
  @IsBoolean()
  isAdmin: boolean;
}
