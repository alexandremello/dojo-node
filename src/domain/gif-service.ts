import { GifList } from './gif-list';
import { GiphyRepository } from '../infrastructure/giphy-repository';

export class GifService {
  constructor(private repository = new GiphyRepository()) {}

  searchByKeyword(keyword: string): Promise<GifList> {
    return this.repository.searchByKeyword(keyword);
  }
}
