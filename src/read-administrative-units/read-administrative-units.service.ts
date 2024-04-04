import { Injectable } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';
import dataSource from 'src/database/data.source';
import { District } from 'src/districts/entities/districts.entity';
import { Province } from 'src/provinces/entities/provinces.entity';
import { Ward } from 'src/wards/entities/wards.entity';
import * as ExcelJS from 'exceljs';
import * as path from 'path';

type ProvinceType = {
  id: number;
  name: string;
};

type DistrictType = {
  id: number;
  name: string;
  province: {
    id: number;
  };
};

type WardType = {
  id: number;
  name: string;
  districtId: number;
};
@Injectable()
@Console()
export class ReadAdministrativeUnitsService {
  @Command({
    command: 'import-data',
    description: 'Read Administrative Units data from xlsx',
  })
  async readAdministrativeData() {
    console.log('Read data from xlsx');
    const workbook = new ExcelJS.Workbook();
    const provinces: ProvinceType[] = [];
    const districts: DistrictType[] = [];
    const wards: WardType[] = [];

    const rootFolderPath = process.cwd();
    const pathToXlsx = path.resolve(rootFolderPath, 'data/divisions-data.xlsx');

    await workbook.xlsx.readFile(pathToXlsx).then(() => {
      const worksheet = workbook.getWorksheet('Sheet1');
      worksheet.spliceRows(1, 1);
      worksheet.eachRow((row) => {
        if (
          provinces.length === 0 ||
          Number(row.getCell(2).value) !== provinces[provinces.length - 1].id
        )
          provinces.push({
            id: Number(row.getCell(2).value),
            name: (row.getCell(1).value as string) || 'Tỉnh X',
          });
        if (
          districts.length === 0 ||
          Number(row.getCell(4).value) !== districts[districts.length - 1].id
        )
          districts.push({
            id: Number(row.getCell(4).value),
            name: (row.getCell(3).value as string) || 'Huyện X',
            province: {
              id: Number(row.getCell(2).value),
            },
          });
        if (
          wards.length === 0 ||
          Number(row.getCell(6).value) !== wards[wards.length - 1].id
        )
          wards.push({
            id: Number(row.getCell(6).value),
            name: (row.getCell(5).value as string) || 'Xã X',
            districtId: Number(row.getCell(4).value),
          });
      });
    });

    await dataSource.initialize();

    console.table(districts);
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(District)
      .values(districts)
      .execute();

    console.log('Complete read data from xlsx');
  }
}
