import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const client = jwksClient({
  jwksUri: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json`
});

/**
 * Retrieves the signing key for JWT verification.
 */
function getKey(header: any, callback: any) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err || !key) {
      callback(err || new Error('Signing key not found'));
    } else {
      callback(null, key.getPublicKey());
    }
  });
}

/**
 * Middleware to check if the user is authenticated using JWT.
 */
export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  jwt.verify(token, getKey, {}, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Invalid token', error: err });
      return;
    }
    req.user = decoded;
    next();
  });
};
