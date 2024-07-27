import * as dotenv from 'dotenv';
import path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export type ConfigProps = {
  POSTGRES_HOST: string;
  POSTGRES_PORT: string;
  POSTGRES_DB: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
};

export const getConfig = (): ConfigProps => ({
  POSTGRES_HOST: process.env['POSTGRES_HOST'] || '',
  POSTGRES_PORT: process.env?.POSTGRES_PORT || '5432',
  POSTGRES_DB: process.env['POSTGRES_DB'] || '',
  POSTGRES_USER: process.env['POSTGRES_USER'] || '',
  POSTGRES_PASSWORD: process.env['POSTGRES_PASSWORD'] || '',
});
