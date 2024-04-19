import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Users } from './users.entity';
import { Role } from 'src/modules/auth/enums/role.enum';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Role,
  })
  name: string;

  @OneToMany(() => Users, (user) => user.role)
  users: Users[];
}
