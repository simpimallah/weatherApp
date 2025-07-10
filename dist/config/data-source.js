"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const env_1 = require("./env");
const User_1 = require("../entities/User");
const City_1 = require("../entities/City");
const WeatherHistory_1 = require("../entities/WeatherHistory");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: env_1.config.DB_HOST,
    port: env_1.config.DB_PORT,
    username: env_1.config.DB_USERNAME,
    password: env_1.config.DB_PASSWORD,
    database: env_1.config.DB_NAME,
    synchronize: true, // Set to false in production
    logging: false,
    entities: [User_1.User, City_1.City, WeatherHistory_1.WeatherHistory],
    migrations: [],
    subscribers: [],
});
