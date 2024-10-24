"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
// src/config.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    MONGO_URI: process.env.MONGODB_URI || '',
    AWS_COGNITO_CLIENT_ID: process.env.AWS_COGNITO_CLIENT_ID || '',
    AWS_COGNITO_USER_POOL_ID: process.env.COGNITO_USER_POOL_ID || '', // Ensure all required variables are here
    AWS_REGION: process.env.AWS_REGION || '',
};
