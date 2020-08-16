jest.mock('node-fetch');
import fetch from 'node-fetch';
import * as searchResponse from '../fixtures/giphy/search-response.json';

import { GiphyRepository } from '../../src/infrastructure/giphy-repository';
import { GifList } from '../../src/domain/gif-list';
import { Config } from '../../src/infrastructure/config';

describe('GipnyRepository', () => {
  const mockFetch: jest.Mock = fetch as any;
  const config = new Config();
  let repository: GiphyRepository;

  beforeAll(() => {
    repository = new GiphyRepository(config);
    jest.spyOn(config, 'apiKey', 'get').mockReturnValue('my_api_key');
    jest.spyOn(config, 'url', 'get').mockReturnValue('http://localhost/search');
  });

  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe('searchByKeyword', () => {

    it('fetches from Giphy', async () => {
      const keyword = 'keyword';
      const gifList: GifList = [
        "https://giphy.com/gifs/boxing-coach-knowledge-GWjUw6yjJcGME",
        "https://giphy.com/gifs/miguelcotto-boxing-miguel-cotto-3oEduSLalG3rotykI8"
      ];
      const fetchResponse = {
        status: 200,
        ok: true,
        json: jest.fn().mockResolvedValue(searchResponse)
      };

      mockFetch.mockResolvedValue(fetchResponse);

      await expect(repository.searchByKeyword(keyword)).resolves.toEqual(gifList);

      expect(mockFetch).toBeCalledWith('http://localhost/search?api_key=my_api_key&q=keyword');
    });

    describe('when fetches fails', () => {
      it('raises Error', async () => {
        const keyword = 'keyword';
        const fetchResponse = {
          status: 500,
          ok: false,
          json: jest.fn().mockResolvedValue({})
        };

        mockFetch.mockResolvedValue(fetchResponse);

        await expect(repository.searchByKeyword(keyword)).rejects.toThrow(Error);
      });
    });
  });
});
