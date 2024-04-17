import { Module } from '@nestjs/common';
import { VaccinePointsService } from './vaccine-points.service';
import { VaccinePointsController } from './vaccine-points.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaccinePoints } from 'src/entities/vaccine-points.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VaccinePoints])],
  providers: [VaccinePointsService],
  controllers: [VaccinePointsController],
})
export class VaccinePointsModule {}
