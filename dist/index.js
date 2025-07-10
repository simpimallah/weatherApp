"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const data_source_1 = require("./config/data-source");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const weather_routes_1 = __importDefault(require("./routes/weather.routes"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/weather', weather_routes_1.default);
// Database Connection
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log('✅ Database connected');
    app.listen(process.env.PORT, () => {
        console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
    });
})
    .catch((err) => {
    console.error('❌ Failed to connect to the database:', err);
});
