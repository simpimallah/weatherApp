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
exports.getWeatherHistory = exports.getWeatherByCity = void 0;
const data_source_1 = require("../config/data-source");
const City_1 = require("../entities/City");
const User_1 = require("../entities/User");
const WeatherHistory_1 = require("../entities/WeatherHistory");
const axios_1 = __importDefault(require("axios"));
const cityRepo = data_source_1.AppDataSource.getRepository(City_1.City);
const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
const historyRepo = data_source_1.AppDataSource.getRepository(WeatherHistory_1.WeatherHistory);
const getWeatherByCity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        const cityName = req.params.city;
        // const apiKey = process.env.OPENWEATHER_API_KEY
        const response = yield axios_1.default.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`);
        const weatherData = response.data;
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
            city = cityRepo.create({ name: cityName, country: country });
            yield cityRepo.save(city);
        }
        const userId = req.user.id;
        const user = yield userRepo.findOneBy({ id: userId });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const newEntry = historyRepo.create({
            user,
            city,
            temperature,
            humidity,
            condition,
        });
        yield historyRepo.save(newEntry);
        res.status(200).json(weatherData);
    }
    catch (error) {
        console.error('Weather error:', error);
        res.status(500).json({ message: 'Failed to fetch weather' });
    }
});
exports.getWeatherByCity = getWeatherByCity;
const getWeatherHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const history = yield historyRepo.find({
            where: { user: { id: userId } },
            relations: ['city'],
            order: { fetchedAt: 'DESC' },
        });
        res.status(200).json(history);
    }
    catch (error) {
        console.error('History error:', error);
        res.status(500).json({ message: 'Failed to fetch history' });
    }
});
exports.getWeatherHistory = getWeatherHistory;
