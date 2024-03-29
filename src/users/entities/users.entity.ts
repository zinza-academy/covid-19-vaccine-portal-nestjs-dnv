import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  city: string;

  @Column()
  district: string;

  @Column()
  ward: string;

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;
}
