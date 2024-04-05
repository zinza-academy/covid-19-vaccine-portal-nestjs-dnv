import { Province } from 'src/modules/provinces/entities/provinces.entity';
import { Ward } from 'src/modules/wards/entities/wards.entity';
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
