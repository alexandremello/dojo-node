import fetch, { Response } from 'node-fetch';
import { Config } from './config';
import { GifList } from '../domain/gif-list';

export class GiphyRepository {
  private readonly url = 'https://api.giphy.com/v1/gifs/search';

  constructor(private config: Config = new Config()) {}

  async searchByKeyword(keyword: string): Promise<GifList> {
    const response: Response = await fetch(this.buildUrl(keyword));

    if (response.ok) {
      const responseBody = await response.json();

      return responseBody.data.map(entry => entry.url);
    } else {
      throw new Error('Could not fetch from Giphy');
    }
  }

  private buildUrl(keyword): string {
    return `${this.url}?api_key=${this.config.apiKey}&q=${keyword}`;
  }
}
