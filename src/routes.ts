import * as express from 'express';

export const routes = express.Router();

routes.get('/', (_req, res) => {
    res.send('Hello world!');
});

