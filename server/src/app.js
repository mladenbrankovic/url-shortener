import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';
import { join } from 'path';
import { port } from '~/src/config';

const app = express();

app.use(json());
app.use(cors());

require('./api/swagger').default(app);

/**
 * @swagger
 *
 * /:
 *   get:
 *     tags: [Base]
 *     summary: Loads a small frontend to shorten URLs.
 */
app.use('/', express.static(join(__dirname, '../../client/dist')));

/**
 * @swagger
 *
 * /{code}:
 *   get:
 *     tags: [Base]
 *     summary: Redirects to URL that had been shorted.
 *     parameters:
 *       - name: code
 *         description: Unique code for shortened URL
 *         type: string
 *         required: true
 *         in: path
 */
app.get('/:code', async (req, res) => {});

require('./api/routes').default(app);

app.listen(port);
