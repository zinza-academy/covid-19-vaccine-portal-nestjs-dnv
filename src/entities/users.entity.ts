import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ward } from './wards.entity';
import { IsOptional } from 'class-validator';
import { Roles } from './roles.entity';

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

  @Column({ nullable: true })
  @IsOptional()
  resetToken: string;

  @Column()
  citizenId: string;

  @ManyToOne(() => Ward, (Ward) => Ward.users)
  ward: Ward;

  @ManyToOne(() => Roles, (roles) => roles.users)
  role: Roles;
}
