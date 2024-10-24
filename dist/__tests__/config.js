"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConfig = void 0;
// src/tests/config.ts
exports.testConfig = {
    cognito: {
        userPoolId: process.env.COGNITO_USER_POOL_ID || 'your-test-user-pool-id',
        clientId: process.env.COGNITO_CLIENT_ID || 'your-test-client-id',
        region: process.env.AWS_REGION || 'your-region'
    }
};
