import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signUp.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const existedUser = await this.usersService.findOneByEmail(signUpDto.email);

    if (existedUser) {
      throw new ConflictException('email already exists');
    }

    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

    const newUser = await this.usersService.createOne({
      ...signUpDto,
      password: hashedPassword,
    });

    return newUser;
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneByEmail(loginDto.email);

    if (!user) {
      throw new NotFoundException('user not found');
    }
    await this.comparePassword(loginDto.password, user.password);

    const payload = {
      id: user.id,
      fullName: user.fullName,
      isAdmin: user.isAdmin,
      email: user.email,
    };
    const accessToken = this.generateAccessToken(payload);

    return { accessToken: accessToken };
  }

  async getAuthenticatedUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      return null;
    }
    await this.comparePassword(password, user.password);

    return user;
  }

  async comparePassword(password: string, hashedPassword: string) {
    const isCorrectPassword = await bcrypt.compare(password, hashedPassword);
    if (!isCorrectPassword) throw new BadRequestException('invalid password');
  }

  async hashPassword(password: string) {
    const salt = this.configService.get('SALT_NUMBER');
    return await bcrypt.hash(password, +salt);
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
