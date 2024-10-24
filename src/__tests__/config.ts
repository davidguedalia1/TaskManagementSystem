// src/tests/config.ts
export const testConfig = {
    cognito: {
      userPoolId: process.env.COGNITO_USER_POOL_ID || 'your-test-user-pool-id',
      clientId: process.env.COGNITO_CLIENT_ID || 'your-test-client-id',
      region: process.env.AWS_REGION || 'your-region'
    }
  };