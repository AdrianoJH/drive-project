// services/auth.service.ts
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY!;

export function generateToken(userId: number): string {
    return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
  }
  
  export function verifyToken(token: string): { userId: number } | null {
    try {
      const decoded = jwt.verify(token, secretKey) as { userId: number };
      return decoded;
    } catch (error) {
      return null;
    }
  }
