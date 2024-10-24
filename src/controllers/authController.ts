import { Request, Response } from 'express';
import { authenticateUser, registerUser, confirmUserRegistration } from '../services/cognitoService';

/**
 * Logs in a user using AWS Cognito.
 */
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await authenticateUser(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};

/**
 * Registers a new user in AWS Cognito.
 */
export const register = async (req: Request, res: Response) => {
  const { email, password, phoneNumber } = req.body;
  try {
    const result = await registerUser(email, password, phoneNumber);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

/**
 * Confirms user registration via code sent to email.
 */
export const confirmRegistration = async (req: Request, res: Response) => {
  const { email, code } = req.body;
  try {
    const result = await confirmUserRegistration(email, code);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
