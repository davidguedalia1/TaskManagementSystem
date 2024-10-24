"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const app_1 = __importDefault(require("./app"));
console.log('Starting the server...');
console.log('MongoDB URI:', config_1.config.MONGO_URI);
mongoose_1.default.connect(config_1.config.MONGO_URI)
    .then(() => {
    console.log('Connected to MongoDB');
    // Start the server after a successful MongoDB connection
    const PORT = process.env.PORT || 8080; // Changed to 3001
    app_1.default.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});
console.log('Server script execution finished');
