import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

config();
const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),

  entities: ['dist/src/**/entities/*.entity.js', 'src/**/entities/*.entity.ts'],

  migrations: ['dist/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
