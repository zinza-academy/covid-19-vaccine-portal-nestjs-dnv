import { Province } from 'src/provinces/entities/provinces.entity';
import { Ward } from 'src/wards/entities/wards.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

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
