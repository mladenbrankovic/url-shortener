import parser from 'body-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';
import routes from '~/src/api/routes';
import swagger from '~/src/api/swagger';
import config from '~/src/config';

const app = express();

app.use(parser.json());
app.use(cors());

swagger(app);

/**
 * @swagger
 *
 * /:
 *   get:
 *     tags: [Base]
 *     summary: Loads a small frontend to shorten URLs.
 */
app.use('/', express.static(path.join(__dirname, '../../client/dist')));

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

routes(app);

app.listen(config.port);
