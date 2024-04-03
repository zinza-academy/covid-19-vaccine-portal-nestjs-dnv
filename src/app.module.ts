import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DistrictsModule } from './districts/districts.module';
import { ProvincesModule } from './provinces/provinces.module';
import { UsersModule } from './users/users.module';
import { WardsModule } from './wards/wards.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    ProvincesModule,
    DistrictsModule,
    WardsModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
