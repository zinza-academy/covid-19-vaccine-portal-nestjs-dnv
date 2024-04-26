import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../../entities/users.entity';
import { SignUpDto } from '../auth/dto/signUp.dto';
import { Role } from '../auth/enums/role.enum';
import { IUser } from '../auth/interfaces';
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

  async findOne(id: number, currentUser: IUser) {
    if (currentUser.role === Role.Admin) {
      return this.usersRepository.findOne({ where: { id } });
    }
    if (currentUser.userId !== id) {
      throw new BadRequestException(
        'Access denied: Users can only access their own information.',
      );
    }
    return this.usersRepository.findOne({ where: { id } });
  }

  async findOneById(id: number) {
    const user = await this.usersRepository.findOneBy({
      id,
    });

    return user;
  }

  async findOneByEmail(email: string) {
    const user = this.usersRepository.findOne({
      where: {
        email,
      },
      relations: {
        role: true,
      },
    });

    return user;
  }

  async createOne(signUpDto: SignUpDto) {
    const user = await this.usersRepository.create({
      ...signUpDto,
      role: {
        id: signUpDto.role_id,
      },
    });
    await this.usersRepository.save(user);
    return user;
  }

  async updateOne(
    id: number,
    updateUserDto: UpdateUserDto,
    currentUser: IUser,
  ) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (currentUser.role !== Role.Admin && currentUser.userId !== id) {
      throw new BadRequestException(
        'Access denied: Users can only access their own information.',
      );
    }

    const { ward_id, ...updateUserWithoutId } = updateUserDto;
    const updateObject = {
      ...updateUserWithoutId,
      ward: ward_id ? { id: ward_id } : undefined,
    };

    await this.usersRepository.update({ id }, updateObject);

    return { message: 'Update successfully' };
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
