import { GifList } from '../../src/domain/gif-list';
import { GifService } from '../../src/domain/gif-service';
import { gifController } from '../../src/controller/gif-controller';

describe('gifController', () => {

  const mockSearchByKeyword = jest.fn();
  const mockGifService: jest.Mock = GifService as any;

  it('fetches gif list by keyword', async () => {
    const keyword = 'keyword';
    const req = {
      query: {
        q: keyword
      }
    };
    const res = {
      json: jest.fn()
    };
    const gifList: GifList = [
      "https://giphy.com/gifs/boxing-coach-knowledge-GWjUw6yjJcGME",
      "https://giphy.com/gifs/miguelcotto-boxing-miguel-cotto-3oEduSLalG3rotykI8"
    ];
    mockSearchByKeyword.mockResolvedValue(gifList);

    await expect(gifController(req, res)).resolves.toStrictEqual(gifList);

    expect(res.json).toBeCalledWith(gifList);
  });
});
