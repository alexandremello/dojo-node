import * as express from 'express';
import { gifController } from './controller/gif-controller';

export const routes = express.Router();

routes.get('/gifs', gifController);
