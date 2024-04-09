import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/signUp.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

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

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneByEmail(loginDto.email);

    await this.comparePassword(loginDto.password, user.password);

    const payload = {
      id: user.id,
      fullName: user.fullName,
      isAdmin: user.isAdmin,
    };
    const accessToken = this.generateAccessToken(payload);

    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, accessToken: accessToken };
  }

  async getAuthenticatedUser(email: string, password: string) {
    try {
      const user = await this.usersService.findOneByEmail(email);

      if (!user) {
        return null;
      }
      await this.comparePassword(password, user.password);

      return user;
    } catch (error) {
      throw new BadRequestException('Wrong credentials!!');
    }
  }

  async comparePassword(password: string, hashedPassword: string) {
    const isCorrectPassword = await bcrypt.compare(password, hashedPassword);
    if (!isCorrectPassword) throw new BadRequestException('invalid password');
  }

  generateAccessToken(payload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      ),
    });
  }
}
