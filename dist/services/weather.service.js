"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAndSaveWeather = void 0;
// src/services/weather.service.ts
const data_source_1 = require("../config/data-source");
const WeatherHistory_1 = require("../entities/WeatherHistory");
const City_1 = require("../entities/City");
const User_1 = require("../entities/User");
// import { generateCSV } from '../utils/csv-export';
const axios_1 = __importDefault(require("axios"));
const weatherRepo = data_source_1.AppDataSource.getRepository(WeatherHistory_1.WeatherHistory);
const cityRepo = data_source_1.AppDataSource.getRepository(City_1.City);
const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
const fetchAndSaveWeather = (cityName, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey)
        throw new Error('API key not set');
    const response = yield axios_1.default.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&units=metric&appid=${apiKey}`);
    const weatherData = response.data;
    // ✅ Extract and validate values
    // Log to inspect the response structure
    console.log('Weather API response:', weatherData);
    const temperature = (_a = weatherData.main) === null || _a === void 0 ? void 0 : _a.temp;
    const humidity = (_b = weatherData.main) === null || _b === void 0 ? void 0 : _b.humidity;
    const condition = (_d = (_c = weatherData.weather) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.description;
    const country = (_e = weatherData.sys) === null || _e === void 0 ? void 0 : _e.country;
    // Validate all required fields
    if (temperature == null || humidity == null || !condition || !country) {
        throw new Error('Incomplete weather data from API');
    }
    let city = yield cityRepo.findOne({ where: { name: cityName } });
    if (!city) {
        city = cityRepo.create({
            name: cityName,
            country: country,
        });
        yield cityRepo.save(city);
    }
    const user = yield userRepo.findOneBy({ id: userId });
    if (!user)
        throw new Error('User not found');
    const weather = weatherRepo.create({
        city,
        user,
        temperature,
        humidity,
        condition,
    });
    yield weatherRepo.save(weather);
    return {
        city: city.name,
        temperature,
        humidity,
        condition,
    };
});
exports.fetchAndSaveWeather = fetchAndSaveWeather;
// export const getUserWeatherHistory = async (userId: number) => {
//   return await weatherRepo.find({
//     where: { user: { id: userId } },
//     relations: ['city'],
//     order: { fetchedAt: 'DESC' },
//   });
// };
// export const exportWeatherHistoryCSV = async () => {
//   const histories = await weatherRepo.find({
//     relations: ['city', 'user'],
//   });
//   const records = histories.map((h) => ({
//     City: h.city.name,
//     Country: h.city.country,
//     Temperature: h.temperature,
//     Humidity: h.humidity,
//     Condition: h.condition,
//     FetchedAt: h.fetchedAt.toISOString(),
//     UserEmail: h.user?.email ?? 'Anonymous',
//   }));
//   return generateCSV(records);
// };
