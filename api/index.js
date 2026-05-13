const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const { name, version } = require('../package.json');

const app = express();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Centro de Estudiantes API',
    version: '1.0.0',
    description: 'Base Node.js API with Express and Swagger'
  },
  servers: [{ url: '/' }]
};

const specs = swaggerJsdoc({
  definition: swaggerDefinition,
  apis: [__filename]
});

// Serve OpenAPI spec as JSON
app.get('/api-docs/swagger.json', (req, res) => {
  res.json(specs);
});

// Serve Swagger UI via CDN (avoids static file issues in serverless environments)
app.get('/api-docs', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Centro de Estudiantes API Docs</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css">
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
  <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-standalone-preset.js"></script>
  <script>
    SwaggerUIBundle({
      url: '/api-docs/swagger.json',
      dom_id: '#swagger-ui',
      presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
      layout: 'StandaloneLayout'
    });
  </script>
</body>
</html>`);
});

/**
 * @openapi
 * /:
 *   get:
 *     summary: API info
 *     tags:
 *       - Info
 *     responses:
 *       200:
 *         description: Returns the package name and version
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: centro-de-estudiantes-api
 *                 version:
 *                   type: string
 *                   example: 1.0.0
 */
app.get('/', (req, res) => {
  res.json({ name, version });
});

/**
 * @openapi
 * /hello:
 *   get:
 *     summary: Hello endpoint
 *     tags:
 *       - Hello
 *     responses:
 *       200:
 *         description: Returns a hello message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello from centro-de-estudiantes-api!
 */
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from centro-de-estudiantes-api!' });
});

module.exports = app;

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}
