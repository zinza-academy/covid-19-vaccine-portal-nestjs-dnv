import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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
