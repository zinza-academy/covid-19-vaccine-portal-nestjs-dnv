import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { DistrictsModule } from '../districts/districts.module';
import { EmailModule } from '../email/email.module';
import { ProvincesModule } from '../provinces/provinces.module';
import { ReadAdministrativeUnitsModule } from '../read-administrative-units/read-administrative-units.module';
import { UsersModule } from '../users/users.module';
import { VaccinePointsModule } from '../vaccine-points/vaccine-points.module';
import { WardsModule } from '../wards/wards.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    ProvincesModule,
    DistrictsModule,
    WardsModule,
    DatabaseModule,
    ReadAdministrativeUnitsModule,
    AuthModule,
    EmailModule,
    VaccinePointsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
