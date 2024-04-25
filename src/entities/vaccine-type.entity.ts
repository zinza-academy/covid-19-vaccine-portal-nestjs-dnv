import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VaccineRegistrationResults } from './vaccine-registration-results.entity';

@Entity()
export class VaccineType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  batchNumber: string;

  @OneToMany(
    () => VaccineRegistrationResults,
    (vaccineRegistration) => vaccineRegistration.vaccineType,
  )
  vaccineRegistrationResults: VaccineRegistrationResults[];
}
