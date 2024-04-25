import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { VaccineRegistrations } from './vaccine-registrations.entity';
import { VaccineType } from './vaccine-type.entity';

@Entity()
export class VaccineRegistrationResults {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'date',
  })
  vaccination_time: string;

  @ManyToOne(
    () => VaccineType,
    (vaccineType) => vaccineType.vaccineRegistrationResults,
  )
  @JoinColumn([{ name: 'vaccine_type_id', referencedColumnName: 'id' }])
  vaccineType: VaccineType;

  @OneToOne(
    () => VaccineRegistrations,
    (vaccineRegistration) => vaccineRegistration,
    { nullable: false },
  )
  @JoinColumn()
  vaccineRegistration: VaccineRegistrations;
}
