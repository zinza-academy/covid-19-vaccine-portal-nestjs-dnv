import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ward } from './wards.entity';

export enum Gender {
  MALE = 'M',
  FEMALE = 'F',
}

@Entity()
export class Users {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'date',
  })
  dateOfBirth: string;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: string;

  @Column()
  citizenId: string;

  @ManyToOne(() => Ward, (Ward) => Ward.users)
  ward: Ward;

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;
}