import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SignUpDto } from './dto/signUp.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JWT_ACCESS_TOKEN_KEY } from './constants';
import { JwtAccessTokenGuard } from './guards/jwt-access-token.guard';
import { Public } from './decorators/isPublic.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, user } = await this.authService.login(loginDto);

    response.cookie(JWT_ACCESS_TOKEN_KEY, accessToken, {
      httpOnly: true,
      secure: true,
    });

    return user;
  }

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return 'profile';
  }
}
