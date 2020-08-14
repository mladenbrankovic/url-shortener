import { Router, static as serveStatic } from 'express';
import { generate } from 'shortid';
import { isUri } from 'valid-url';
import { baseUrl, frontendDist } from '~/src/config';
import Url from '~/src/models/url';

const router = Router();

/**
 * @swagger
 *
 * /:
 *   get:
 *     tags: [Base]
 *     summary: Loads a small frontend to shorten URLs.
 */
router.use('/', serveStatic(frontendDist));

/**
 * @swagger
 *
 * /{code}:
 *   get:
 *     tags: [Base]
 *     summary: Loads the URL corresponding to the code.
 *     parameters:
 *       - name: code
 *         description: Unique code for shortened URL
 *         type: string
 *         required: true
 *         in: path
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/URL'
 *       '404':
 *         description: There is no URL with given code.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Error'
 */
router.get('/:code', async (req, res) => {
  const code = req.params.code;
  const url = await Url.findOne({ code });

  res.redirect(url ? url.long : '/');
});

/**
 * @swagger
 *
 * /api/url:
 *   post:
 *     tags: [API]
 *     summary: Creates a shortened URL and returns a full URL object.
 *     requestBody:
 *       description: Object with the full URL to be shortened
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/RequestURL'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *              application/json:
 *                schema:
 *                  $ref: '#/definitions/URL'
 *       '400':
 *         description: Bad request or malformed URL
 *         content:
 *              application/json:
 *                schema:
 *                  $ref: '#/definitions/Error'
 *       '500':
 *         description: Internal server error
 *         content:
 *              application/json:
 *                schema:
 *                  $ref: '#/definitions/Error'
 */
router.post('/api/url', async (req, res) => {
  const { long } = req.body;

  if (!isUri(long)) return res.status(400).json({ error: 'Malformed URL.' });

  const code = generate();
  const short = `${baseUrl}/${code}`;

  // Same URL as requested one
  const twin = await Url.findOne({ long });

  if (twin) return res.status(201).json(twin);

  const url = new Url({
    long,
    short,
    code,
    created: Date.now(),
  });

  try {
    const savedUrl = await url.save();
    res.status(201).json(savedUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 *
 * /api/url/{code}:
 *   get:
 *     tags: [API]
 *     summary: Returns full URL object of given code.
 *     parameters:
 *       - name: code
 *         description: Unique code for shortened URL
 *         type: string
 *         required: true
 *         in: path
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/definitions/URL'
 *       '404':
 *         description: There is no URL with given code.
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/definitions/Error'
 */
router.get('/api/url/:code', async (req, res) => {
  const code = req.params.code;
  const url = await Url.findOne({ code });

  if (!url) return res.status(404).json({ error: `No URL with ID ${code} found.` });
  else res.status(200).json(url);
});

router.get('*', (req, res) => {
  res.redirect('/');
});

export default router;
