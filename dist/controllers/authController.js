"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmPasswordReset = exports.requestPasswordReset = exports.confirmRegistration = exports.register = exports.login = void 0;
const cognitoService_1 = require("../services/cognitoService");
const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    try {
        const result = await (0, cognitoService_1.authenticateUser)(email, password);
        res.json(result);
    }
    catch (error) {
        const err = error;
        res.status(401).json({ message: err.message });
    }
};
exports.login = login;
const register = async (req, res) => {
    const { email, password, phoneNumber } = req.body;
    console.log(email);
    console.log(password);
    try {
        const result = await (0, cognitoService_1.registerUser)(email, password, phoneNumber);
        res.status(201).json(result);
    }
    catch (error) {
        const err = error;
        res.status(400).json({ message: err.message });
    }
};
exports.register = register;
const confirmRegistration = async (req, res) => {
    const { email, code } = req.body;
    try {
        const result = await (0, cognitoService_1.confirmUserRegistration)(email, code);
        res.json(result);
    }
    catch (error) {
        const err = error;
        res.status(400).json({ message: err.message });
    }
};
exports.confirmRegistration = confirmRegistration;
const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    try {
        const result = await (0, cognitoService_1.forgotPassword)(email);
        res.json(result);
    }
    catch (error) {
        const err = error;
        res.status(400).json({ message: err.message });
    }
};
exports.requestPasswordReset = requestPasswordReset;
const confirmPasswordReset = async (req, res) => {
    const { email, code, newPassword } = req.body;
    try {
        const result = await (0, cognitoService_1.confirmForgotPassword)(email, code, newPassword);
        res.json(result);
    }
    catch (error) {
        const err = error;
        res.status(400).json({ message: err.message });
    }
};
exports.confirmPasswordReset = confirmPasswordReset;
