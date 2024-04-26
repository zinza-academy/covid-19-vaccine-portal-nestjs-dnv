import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './user-create.dto';

export class UpdateUserDto extends OmitType(PartialType(CreateUserDto), [
  'password',
]) {}
