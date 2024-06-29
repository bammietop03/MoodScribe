import jwt from 'jsonwebtoken';
import dbClient from './db';
import { configDotenv } from 'dotenv';

configDotenv();

const secret = process.env.JWT_SECRET;

// Generate a new token
export function generateToken(payload) {
  return jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: '1m' });
}

// Verify token
export function verifyToken(token) {
    try {
      const data = jwt.verify(token, secret, { algorithm: 'HS256' });
      return { valid: true, expired: false, data };
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        return { valid: false, expired: true, data: null };
      }
      return { valid: false, expired: false, data: null };
    }
}

// Authenticate token and Return Current User
export async function authenticateToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ error: 'Missing Token' });

    const { valid, expired, data } = verifyToken(token);
    if (!valid) {
        if (expired) {
            return res.status(401).json({ error: 'Your session timed out. Please log in to continue.' });
        }
        return res.status(401).json({ error: 'Invalid Token' });
    }

    const user = await dbClient.db
        .collection('users')
        .findOne({ email: data.email });
    if (!user) return res.status(401).json({ error: 'Invalid Token' });

    req.user = user;
    next();
}
