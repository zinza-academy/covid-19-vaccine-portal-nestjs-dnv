import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAccessTokenStrategy } from './strategies/jwt-access-token.strategy';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({}), EmailModule],
  controllers: [AuthController],
  providers: [AuthService, JwtAccessTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
