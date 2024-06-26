import { Province } from 'src/entities/provinces.entity';
import { Ward } from 'src/entities/wards.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { VaccinePoints } from './vaccine-points.entity';

@Entity()
export class District {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Province, (province) => province.districts)
  province: Province;

  @OneToMany(() => Ward, (ward) => ward.district)
  wards: Ward[];
}
