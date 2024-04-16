import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signUp.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { EmailService } from '../email/email.service';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private emailService: EmailService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const existedUser = await this.usersService.findOneByEmail(signUpDto.email);

    if (existedUser) {
      throw new ConflictException('email already exists');
    }

    const hashedPassword = await this.hashPassword(signUpDto.password);

    return this.usersService.createOne({
      ...signUpDto,
      password: hashedPassword,
    });
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

  async sendPasswordResetEmail(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.usersService.findOneByEmail(
      forgotPasswordDto.email,
    );
    if (!user) throw new NotFoundException('user not found');

    const payload = {
      id: user.id,
      email: user.email,
    };
    const resetToken = this.generateResetPasswordToken(payload);

    await this.emailService.sendResetPasswordEmail(user.email, resetToken);
  }

  async resetPassword(token: string, resetPasswordDto: ResetPasswordDto) {
    try {
      const validToken = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      const user = await this.usersService.findOneById(validToken.id);
      if (!user) {
        throw new NotFoundException('user not found');
      }
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      }
      throw new UnauthorizedException('Invalid token');
    }
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

  private generateAccessToken(payload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      ),
    });
  }

  private generateResetPasswordToken(payload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>(
        'JWT_RESET_PASSWORD_TOKEN_EXPIRATION_TIME',
      ),
    });
  }
}
