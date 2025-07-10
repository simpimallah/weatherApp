"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
// import { config } from './env';
// import { User } from '../entities/User';
// import { City } from '../entities/City';
// import { WeatherHistory } from '../entities/WeatherHistory';
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true, // ⚠️ disable in production
    logging: true,
    entities: ['dist/entities/*.js'], // adjust if needed
    migrations: ['dist/migrations/*.js'],
    subscribers: [],
});
