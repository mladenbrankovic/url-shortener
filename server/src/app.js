import { json } from 'body-parser';
import cors from 'cors';
import express, { static as serveStatic } from 'express';
import { join } from 'path';
import { initRoutes } from '~/src/api/routes';
import { initSwagger } from '~/src/api/swagger';
import { port } from '~/src/config';
import { notify } from '~/src/util/logger';

const app = express();

app.use(json());
app.use(cors());

initSwagger(app);

/**
 * @swagger
 *
 * /:
 *   get:
 *     tags: [Base]
 *     summary: Loads a small frontend to shorten URLs.
 */
app.use('/', serveStatic(join(__dirname, '../../client/dist')));

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

initRoutes(app);

app.listen(port, () => {
  notify(`Server live on port ${port}`);
});
