import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { VaccineRegistrationResults } from './vaccine-registration-results.entity';

export enum VaccineRegistrationStatus {
  Requested = 'requested',
  Accepted = 'accepted',
  Rejected = 'rejected',
  Completed = 'completed',
}

@Entity()
export class VaccineRegistrations {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  priorityType: number;

  @Column()
  job: number;

  @Column()
  workplace: string;

  @Column()
  address: string;

  @Column()
  desired_date: number;

  @Column()
  health_insurance_number: string;

  @Column({
    type: 'date',
  })
  appointmentDate: string;

  @Column({
    type: 'enum',
    enum: VaccineRegistrationStatus,
    default: VaccineRegistrationStatus.Requested,
  })
  status: VaccineRegistrationStatus;

  @ManyToOne(() => Users, (user) => user.vaccineRegistrations)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @OneToOne(
    () => VaccineRegistrationResults,
    (vaccineRegistrationResult) =>
      vaccineRegistrationResult.vaccineRegistration,
  )
  vaccineRegistrationResults: VaccineRegistrationResults;
}
