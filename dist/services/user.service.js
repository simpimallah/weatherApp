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
exports.UserService = void 0;
const data_source_1 = require("../config/data-source");
const User_1 = require("../entities/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
class UserService {
    constructor() {
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.userRepository.findOne({ where: { email: userData.email } });
            if (existingUser)
                throw new Error('User already exists');
            const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
            const user = this.userRepository.create({
                name: userData.name,
                email: userData.email,
                password: hashedPassword,
            });
            return yield this.userRepository.save(user);
        });
    }
    login(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ where: { email: credentials.email } });
            if (!user)
                throw new Error('Invalid email or password');
            const isMatch = yield bcrypt_1.default.compare(credentials.password, user.password);
            if (!isMatch)
                throw new Error('Invalid email or password');
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, env_1.config.JWT_SECRET, { expiresIn: '1h' });
            return token;
        });
    }
}
exports.UserService = UserService;
