import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { District } from './districts.entity';

@Entity()
export class Province {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => District, (district) => district.province)
  districts: District[];
}
