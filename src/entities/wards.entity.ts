import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { District } from './districts.entity';
import { Users } from './users.entity';

@Entity()
export class Ward {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => District, (district) => district.wards)
  district: District;

  @OneToMany(() => Users, (user) => user.ward)
  users: Users[];
}
