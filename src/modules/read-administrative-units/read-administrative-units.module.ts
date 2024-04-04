import { Module } from '@nestjs/common';
import { ReadAdministrativeUnitsService } from './read-administrative-units.service';
import { ConsoleModule } from 'nestjs-console';

@Module({
  imports: [ConsoleModule],
  providers: [ReadAdministrativeUnitsService],
})
export class ReadAdministrativeUnitsModule {}
