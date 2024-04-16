import { SignUpDto } from '../auth/dto/signUp.dto';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../../entities/users.entity';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdateUserDto } from './dto/user-update.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findAll() {
    return this.usersRepository.find();
  }

  async findOneById(id: number) {
    const user = await this.usersRepository.findOneBy({
      id,
    });

    return user;
  }

  async findOneByEmail(email: string) {
    const user = this.usersRepository.findOneBy({
      email,
    });

    return user;
  }

  async createOne(signUpDto: SignUpDto) {
    const user = await this.usersRepository.create(signUpDto);
    await this.usersRepository.save(user);
    return user;
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({
      id,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return 'update user';
  }

  async deleteOne(id: number) {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.usersRepository.remove(user);
  }

  async updatePassword(id: number, newHashPassword: string) {
    const updatedUser = await this.findOneById(id);
    updatedUser.password = newHashPassword;

    await this.usersRepository.save(updatedUser);
  }

  async setResetToken(id: number, resetToken: string | null) {
    return await this.usersRepository.update(
      {
        id,
      },
      {
        resetToken,
      },
    );
  }

  async findResetToken(id: number) {
    const user = await this.usersRepository.findOneBy({
      id,
    });

    return user.resetToken;
  }
}
