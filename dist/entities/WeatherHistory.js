"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherHistory = void 0;
// src/entities/WeatherHistory.ts
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const City_1 = require("./City");
let WeatherHistory = class WeatherHistory {
};
exports.WeatherHistory = WeatherHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WeatherHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => City_1.City, (city) => city.weatherHistory, { eager: true }),
    __metadata("design:type", City_1.City)
], WeatherHistory.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.weatherHistory, { eager: true }),
    __metadata("design:type", User_1.User)
], WeatherHistory.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: false }),
    __metadata("design:type", Number)
], WeatherHistory.prototype, "temperature", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: false }),
    __metadata("design:type", Number)
], WeatherHistory.prototype, "humidity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], WeatherHistory.prototype, "condition", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], WeatherHistory.prototype, "fetchedAt", void 0);
exports.WeatherHistory = WeatherHistory = __decorate([
    (0, typeorm_1.Entity)()
], WeatherHistory);
