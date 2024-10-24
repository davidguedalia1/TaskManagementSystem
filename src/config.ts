// src/config.ts
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  MONGO_URI: process.env.MONGODB_URI || '',
  AWS_COGNITO_CLIENT_ID: process.env.AWS_COGNITO_CLIENT_ID || '',
  AWS_COGNITO_USER_POOL_ID: process.env.COGNITO_USER_POOL_ID || '', 
  AWS_REGION: process.env.AWS_REGION || '',
};
