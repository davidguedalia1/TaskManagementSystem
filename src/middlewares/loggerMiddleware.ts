import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to handle logs.
 */
export default function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method} ${req.url}`);
  next();
}
