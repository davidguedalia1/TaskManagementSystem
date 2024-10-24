"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
// Login route
router.post('/login', authController_1.login);
// Registration route
router.post('/register', authController_1.register);
// Confirm registration route
router.post('/confirm-registration', authController_1.confirmRegistration);
// Request password reset route
router.post('/request-password-reset', authController_1.requestPasswordReset);
// Confirm password reset route
router.post('/confirm-password-reset', authController_1.confirmPasswordReset);
exports.default = router;
