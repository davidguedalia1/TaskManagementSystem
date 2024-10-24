import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to handle errors and return a 500 status with a generic error message.
 */
export default function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
}
