module.exports = (app) => {
  const config = require('../../../config');
  const swaggerJSDoc = require('swagger-jsdoc');
  const swaggerUIExpress = require('swagger-ui-express');

  const v1Config = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        version: '1.0.0',
        title: config.DOMAIN + ' - API Reference',
        description: 'Reference to the API of ' + config.DOMAIN,
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
    apis: [
      'src/app.js',
      'src/api/swagger.js',
      'src/api/routes.js',
    ],
  };

  const swaggerDocs = swaggerJSDoc(v1Config);
  app.use('/api/docs', swaggerUIExpress.serve, swaggerUIExpress.setup(swaggerDocs));

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
