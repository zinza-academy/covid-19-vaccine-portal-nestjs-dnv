import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { District } from './districts.entity';

@Entity()
export class VaccinePoints {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @ManyToOne(() => District, (district) => district.vaccinePoints)
  district: District;

  @Column()
  manager: string;

  @Column('int')
  table_number: number;
}
