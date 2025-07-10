"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Authorization header missing or malformed' });
        return; // ✅ Make sure to return here
    }
    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET not defined in environment');
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = {
            id: decoded.id,
            email: decoded.email,
        };
        return next(); // ✅ Return the call to next()
        // oxlint-disable-next-line no-unused-vars
    }
    catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' });
        return; // ✅ Ensure response ends here
    }
};
exports.authenticate = authenticate;
