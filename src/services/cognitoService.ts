import { CognitoIdentityProviderClient, InitiateAuthCommand, SignUpCommand, ConfirmSignUpCommand, AuthFlowType } from '@aws-sdk/client-cognito-identity-provider';

const cognitoClient = new CognitoIdentityProviderClient({ 
  region: process.env.AWS_REGION
});

/**
 * Authenticates a user via AWS Cognito with email and password.
 */
export const authenticateUser = async (email: string, password: string) => {
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH' as AuthFlowType,
    ClientId: process.env.AWS_COGNITO_CLIENT_ID!,
    AuthParameters: { USERNAME: email, PASSWORD: password },
  };

  try {
    const command = new InitiateAuthCommand(params);
    return await cognitoClient.send(command);
  } catch (error) {
    throw new Error(`Error authenticating user: ${error instanceof Error ? error.message : String(error)}`);
  }
};

/**
 * Registers a new user in AWS Cognito.
 */
export const registerUser = async (email: string, password: string, phoneNumber: string) => {
  const params = {
    ClientId: process.env.AWS_COGNITO_CLIENT_ID!,
    Username: email,
    Password: password,
    UserAttributes: [{ Name: 'email', Value: email }, { Name: 'phone_number', Value: phoneNumber }],
  };

  try {
    const command = new SignUpCommand(params);
    return await cognitoClient.send(command);
  } catch (error) {
    throw new Error(`Error registering user: ${error instanceof Error ? error.message : String(error)}`);
  }
};

/**
 * Confirms a user's registration with the provided confirmation code.
 */
export const confirmUserRegistration = async (email: string, code: string) => {
  const params = {
    ClientId: process.env.AWS_COGNITO_CLIENT_ID!,
    Username: email,
    ConfirmationCode: code,
  };

  try {
    const command = new ConfirmSignUpCommand(params);
    return await cognitoClient.send(command);
  } catch (error) {
    throw new Error(`Error confirming user registration: ${error instanceof Error ? error.message : String(error)}`);
  }
};
