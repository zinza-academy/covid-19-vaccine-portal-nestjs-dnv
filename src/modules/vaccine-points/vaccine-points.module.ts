import { Module } from '@nestjs/common';
import { VaccinePointsService } from './vaccine-points.service';
import { VaccinePointsController } from './vaccine-points.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaccinePoints } from 'src/entities/vaccine-points.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAccessTokenStrategy } from '../auth/strategies/jwt-access-token.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessTokenGuard } from '../auth/guards/jwt-access-token.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([VaccinePoints]),
    UsersModule,
    PassportModule,
    JwtModule.register({}),
  ],
  providers: [
    VaccinePointsService,
    JwtAccessTokenStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAccessTokenGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [VaccinePointsController],
})
export class VaccinePointsModule {}
