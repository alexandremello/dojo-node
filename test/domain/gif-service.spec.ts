import { GiphyRepository } from '../../src/infrastructure/giphy-repository';
import { GifService } from '../../src/domain/gif-service';
import { GifList } from '../../src/domain/gif-list';

describe('GifService', () => {
  let service: GifService;
  const mockSearch = jest.fn();
  const repository: GiphyRepository = {
    searchByKeyword: mockSearch
  } as any;

  beforeAll(() => {
    service = new GifService(repository)
  });

  beforeEach(() => {
    mockSearch.mockClear();
  });

  describe('searchByKeyword', () => {
    it('fetches from giphy repository', async () => {
      const keyword = 'keyword';
      const gifList: GifList = [
        "https://giphy.com/gifs/boxing-coach-knowledge-GWjUw6yjJcGME",
        "https://giphy.com/gifs/miguelcotto-boxing-miguel-cotto-3oEduSLalG3rotykI8"
      ];

      mockSearch.mockResolvedValue(gifList);

      await expect(service.searchByKeyword(keyword)).resolves.toEqual(gifList);

      expect(mockSearch).toBeCalledWith(keyword);
    });
  });
});
