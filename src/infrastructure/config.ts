import * as dotenv from 'dotenv';
dotenv.config();

export class Config {
  get apiKey(): string {
    return process.env.API_KEY;
  }
}
