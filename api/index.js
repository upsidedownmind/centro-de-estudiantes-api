const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const { name, version } = require('../package.json');

const app = express();

app.use(cors());

// Serve robots.txt from project root
app.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'robots.txt'));
});

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

// Allow AI agents, block search engine indexing
// Serve Swagger UI via CDN (avoids static file issues in serverless environments)
app.get('/api-docs', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'api-docs.html'));
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
