"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmForgotPassword = exports.forgotPassword = exports.confirmUserRegistration = exports.registerUser = exports.authenticateUser = void 0;
const client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
// Initialize the Cognito client with your AWS region from environment variables
const cognitoClient = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({
    region: process.env.AWS_REGION || 'us-east-1' // Default to 'us-east-1' if not set
});
/**
 * Authenticates a user with AWS Cognito using USER_PASSWORD_AUTH.
 *
 * @param email - The user's email (username in Cognito)
 * @param password - The user's password
 * @returns A promise that resolves with the authentication result
 */
const authenticateUser = async (email, password) => {
    const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: process.env.AWS_COGNITO_CLIENT_ID, // Ensure this is set in your environment variables
        AuthParameters: {
            USERNAME: email,
            PASSWORD: password,
        },
    };
    try {
        const command = new client_cognito_identity_provider_1.InitiateAuthCommand(params);
        const result = await cognitoClient.send(command);
        return result;
    }
    catch (error) {
        throw new Error(`Error authenticating user: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.authenticateUser = authenticateUser;
/**
 * Registers a new user in AWS Cognito.
 *
 * @param email - The user's email (username in Cognito)
 * @param password - The user's password
 * @returns A promise that resolves with the user registration result
 */
const registerUser = async (email, password, phoneNumber) => {
    const params = {
        ClientId: process.env.AWS_COGNITO_CLIENT_ID, // Ensure this is correctly set in the .env file
        Username: email, // Set the email as the Username
        Password: password,
        UserAttributes: [
            {
                Name: 'email',
                Value: email,
            },
            {
                Name: 'phone_number',
                Value: phoneNumber,
            }
        ],
    };
    try {
        const command = new client_cognito_identity_provider_1.SignUpCommand(params);
        const result = await cognitoClient.send(command);
        return result;
    }
    catch (error) {
        throw new Error(`Error registering user: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.registerUser = registerUser;
/**
 * Confirms a user's registration by verifying the confirmation code.
 *
 * @param email - The user's email (username in Cognito)
 * @param code - The confirmation code received via email
 * @returns A promise that resolves with the confirmation result
 */
const confirmUserRegistration = async (email, code) => {
    const params = {
        ClientId: process.env.AWS_COGNITO_CLIENT_ID, // Ensure this is set in your environment variables
        Username: email,
        ConfirmationCode: code,
    };
    try {
        const command = new client_cognito_identity_provider_1.ConfirmSignUpCommand(params);
        const result = await cognitoClient.send(command);
        return result;
    }
    catch (error) {
        throw new Error(`Error confirming user registration: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.confirmUserRegistration = confirmUserRegistration;
/**
 * Initiates password recovery for a user.
 *
 * @param email - The user's email (username in Cognito)
 * @returns A promise that resolves with the password recovery initiation result
 */
const forgotPassword = async (email) => {
    const params = {
        ClientId: process.env.AWS_COGNITO_CLIENT_ID, // Ensure this is set in your environment variables
        Username: email,
    };
    try {
        const command = new client_cognito_identity_provider_1.ForgotPasswordCommand(params);
        const result = await cognitoClient.send(command);
        return result;
    }
    catch (error) {
        throw new Error(`Error initiating forgot password: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.forgotPassword = forgotPassword;
/**
 * Confirms the new password for a user.
 *
 * @param email - The user's email (username in Cognito)
 * @param code - The confirmation code received via email
 * @param newPassword - The new password for the user
 * @returns A promise that resolves with the password confirmation result
 */
const confirmForgotPassword = async (email, code, newPassword) => {
    const params = {
        ClientId: process.env.AWS_COGNITO_CLIENT_ID, // Ensure this is set in your environment variables
        Username: email,
        ConfirmationCode: code,
        Password: newPassword,
    };
    try {
        const command = new client_cognito_identity_provider_1.ConfirmForgotPasswordCommand(params);
        const result = await cognitoClient.send(command);
        return result;
    }
    catch (error) {
        throw new Error(`Error confirming new password: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.confirmForgotPassword = confirmForgotPassword;
