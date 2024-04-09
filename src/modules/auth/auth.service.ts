import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/signUp.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(signUpDto: SignUpDto) {
    try {
      const existedUser = await this.usersService.findOneByEmail(
        signUpDto.email,
      );

      if (existedUser) {
        throw new ConflictException('email already exists');
      }

      const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

      const newUser = await this.usersService.createOne({
        ...signUpDto,
        password: hashedPassword,
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async getAuthenticatedUser(email: string, password: string) {
    try {
      const user = await this.usersService.findOneByEmail(email);

      if (!user) {
        return null;
      }
      await this.verifyPlainContentWithHashedContent(password, user.password);

      return user;
    } catch (error) {
      throw new BadRequestException('Wrong credentials!!');
    }
  }

  private async verifyPlainContentWithHashedContent(
    plainText: string,
    hashedText: string,
  ) {
    const isMatching = await bcrypt.compare(plainText, hashedText);
    if (!isMatching) {
      throw new BadRequestException('invalid password');
    }
  }
}
