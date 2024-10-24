"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loggerMiddleware_1 = __importDefault(require("./middlewares/loggerMiddleware"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(loggerMiddleware_1.default);
// Routes
app.use('/auth', authRoutes_1.default);
app.use('/projects', projectRoutes_1.default);
app.use('/tasks', taskRoutes_1.default);
// Error handling middleware
app.use(errorMiddleware_1.default);
exports.default = app;
