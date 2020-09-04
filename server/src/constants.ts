import dotenv from 'dotenv';

dotenv.config();

export const PRODUCTION = process.env.NODE_ENV === 'production';
export const POSTGRES_PSW = process.env.POSTGRES_PSW;
export const PORT = process.env.PORT;
export const REDIS_SECRET = process.env.REDIS_SECRET as string;
