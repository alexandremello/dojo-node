import { GifService } from '../domain/gif-service';

export const gifController = async (req, res) => {
  const gifService = new GifService();
  const keyword = req.query.q;
  const gifList = await gifService.searchByKeyword(keyword);

  res.json(gifList);
}
