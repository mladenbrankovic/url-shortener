import swaggerJSDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import { domain } from '~/src/config';

export function initSwagger(app) {
  const swaggerConfig = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        version: '1.0.0',
        title: domain + ' - API Reference',
        description: 'Reference to the API of ' + domain,
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
    apis: ['src/app.js', 'src/api/swagger.js', 'src/api/routes.js'],
  };

  app.use('/api/docs', serve, setup(swaggerJSDoc(swaggerConfig)));

  /**
   * @swagger
   *
   * tags:
   *   - name: Base
   *     description: Base routes that are not "part" of the API.
   *   - name: URLs
   *     description: API for URLs from the URL-shortener
   * definitions:
   *   Error:
   *     properties:
   *       error:
   *         type: string
   *   LongURL:
   *     properties:
   *       long:
   *         type: string
   *   URL:
   *     properties:
   *       long:
   *         type: string
   *       short:
   *         type: string
   *       code:
   *         type: string
   *       created:
   *         type: number
   */
}
