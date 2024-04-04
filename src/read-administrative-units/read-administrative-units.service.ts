import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { Command, Console } from 'nestjs-console';
import * as path from 'path';
import dataSource from 'src/database/data.source';
import { Ward } from 'src/wards/entities/wards.entity';

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
  name: string;
  district: {
    id: number;
  };
};
@Injectable()
@Console()
export class ReadAdministrativeUnitsService {
  @Command({
    command: 'import-data',
    description: 'Read Administrative Units data from xlsx',
  })
  async readAdministrativeData() {
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

        wards.push({
          name: (row.getCell(5).value as string) || 'Xã X',
          district: {
            id: Number(row.getCell(4).value),
          },
        });
      });
    });
  }
}
