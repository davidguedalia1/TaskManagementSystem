"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// jest.setup.ts
console.log('jest.setup.ts is running'); // Debug statement to check if setup file is loaded
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log('Loaded AWS_COGNITO_CLIENT_ID:', process.env.AWS_COGNITO_CLIENT_ID); // Check if the variable is loaded
