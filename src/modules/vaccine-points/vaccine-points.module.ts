import { Module } from '@nestjs/common';
import { VaccinePointsService } from './vaccine-points.service';
import { VaccinePointsController } from './vaccine-points.controller';

@Module({
  providers: [VaccinePointsService],
  controllers: [VaccinePointsController]
})
export class VaccinePointsModule {}
