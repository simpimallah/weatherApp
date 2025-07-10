import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from './env';
import { User } from '../entities/User';
import { City } from '../entities/City';
import { WeatherHistory } from '../entities/WeatherHistory';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: true, // Set to false in production
  logging: false,
  entities: [User, City, WeatherHistory],
  migrations: [],
  subscribers: [],
});
