"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const weather_controller_1 = require("../controllers/weather.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Get current weather by city (authenticated)
router.get('/city/:city', auth_middleware_1.authenticate, weather_controller_1.getWeatherByCity);
// Get user's weather search history (authenticated)
router.get('/history', auth_middleware_1.authenticate, weather_controller_1.getWeatherHistory);
exports.default = router;
