import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { District } from './districts.entity';
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
  ward: Ward;

  @Column()
  manager: string;

  @Column('int')
  table_number: number;
}
