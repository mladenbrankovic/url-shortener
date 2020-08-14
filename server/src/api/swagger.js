import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUIExpress from 'swagger-ui-express';
import config from '~/src/config';

export default (app) => {
  const swaggerConfig = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        version: '1.0.0',
        title: config.domain + ' - API Reference',
        description: 'Reference to the API of ' + config.domain,
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

  app.use('/api/docs', swaggerUIExpress.serve, swaggerUIExpress.setup(swaggerJSDoc(swaggerConfig)));

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
};
