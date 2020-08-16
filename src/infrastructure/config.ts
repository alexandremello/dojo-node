import * as dotenv from 'dotenv';
dotenv.config();

export class Config {
  get apiKey(): string {
    return process.env.API_KEY;
  }

  get url(): string {
    return 'https://api.giphy.com/v1/gifs/search';
  }
}
