import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ward } from './wards.entity';

@Entity()
export class VaccinePoints {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @ManyToOne(() => Ward, (ward) => ward.vaccinePoints)
  @JoinColumn([{ name: 'ward_id', referencedColumnName: 'id' }])
  ward: Ward;

  @Column()
  manager: string;

  @Column('int')
  table_number: number;
}
