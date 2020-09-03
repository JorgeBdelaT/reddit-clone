import dotenv from 'dotenv';

dotenv.config();

export const PRODUCTION = process.env.NODE_ENV !== 'production';
export const POSTGRES_PSW = process.env.POSTGRES_PSW;
