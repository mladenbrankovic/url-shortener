module.exports = (app) => {
  /**
   * @swagger
   *
   * /api/url:
   *   post:
   *     tags: [URLs]
   *     summary: Creates a shortened URL and returns a full URL object.
   *     requestBody:
   *       description: Object with a longUrl
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/definitions/LongURL'
   *     responses:
   *       '201':
   *         description: Created
   *         schema:
   *           $ref: '#/definitions/URL'
   *       '400':
   *         description: Bad request or malformed URL
   *         schema:
   *           $ref: '#/definitions/Error'
   *       '500':
   *         description: Internal server error
   *         schema:
   *           $ref: '#/definitions/Error'
   */
  app.post('api/url', async (req, res) => {});

  /**
   * @swagger
   *
   * /api/url/{code}:
   *   get:
   *     tags: [URLs]
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
   *         schema:
   *           $ref: '#/definitions/URL'
   *       '404':
   *         description: There is no URL with given code.
   *         schema:
   *           $ref: '#/definitions/Error'
   */
  app.get('api/url/:code', async (req, res) => {});
};
