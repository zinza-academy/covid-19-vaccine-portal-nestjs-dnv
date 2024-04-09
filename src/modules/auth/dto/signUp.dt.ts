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
} from 'class-validator';
import { Gender } from 'src/entities/users.entity';

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
  ward: number;

  @IsBoolean()
  isAdmin: boolean;
}
