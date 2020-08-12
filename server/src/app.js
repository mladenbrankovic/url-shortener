const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const path = require('path');
const config = require('../../config');

const app = express();

app.use(parser.json());
app.use(cors());

require('./api/swagger')(app);

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

require('./api/routes')(app);

app.listen(config.PORT);
