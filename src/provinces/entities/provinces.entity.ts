import { District } from 'src/districts/entities/districts.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Province {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => District, (district) => district.province)
  districts: District[];
}
