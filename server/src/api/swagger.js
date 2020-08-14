import swaggerJSDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import { baseUrl } from '~/src/config';
import { log } from '~/src/util/logger';

export function initSwagger(app) {
  log('Initializing Swagger');

  const swaggerConfig = {
    definition: {
      openapi: '3.0.0',
      basePath: '/',
      info: {
        version: '1.0.0',
        title: baseUrl + ' - API Reference',
        description: 'Reference to the API of ' + baseUrl,
        contact: {
          name: 'Mladen Brankovic',
          email: 'root@brankovic.dev',
          url: 'https://brankovic.dev/',
        },
        license: {
          name: 'MIT',
          url: 'https://opensource.org/licenses/MIT',
        },
      },
    },
    apis: ['src/api/swagger.js', 'src/api/router.js'],
  };

  const swaggerSpec = swaggerJSDoc(swaggerConfig);

  app.use('/api/docs', serve, setup(swaggerSpec));

  app.get('/api/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  /**
   * @swagger
   *
   * tags:
   *   - name: Base
   *     description: Base routes that are not "part" of the API.
   *   - name: API
   *     description: API for URLs from the URL-shortener
   * definitions:
   *   Error:
   *     type: object
   *     properties:
   *       error:
   *         type: string
   *   RequestURL:
   *     type: object
   *     properties:
   *       long:
   *         type: string
   *   URL:
   *     type: object
   *     properties:
   *       long:
   *         type: string
   *         descriprion: 'aaa'
   *       short:
   *         type: string
   *       code:
   *         type: string
   *       created:
   *         type: integer
   */
}
