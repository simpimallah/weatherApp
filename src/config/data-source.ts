import 'reflect-metadata';
import { DataSource } from 'typeorm';
// import { config } from './env';
// import { User } from '../entities/User';
// import { City } from '../entities/City';
// import { WeatherHistory } from '../entities/WeatherHistory';
import dotenv from 'dotenv';
import { City } from '../entities/City';
import { User } from '../entities/User';
import { WeatherHistory } from '../entities/WeatherHistory';
dotenv.config();

export const AppDataSource = new DataSource({
 type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // ⚠️ disable in production
  logging: false,
  entities: [City,User,WeatherHistory], // adjust if needed

});
