const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = app;

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}
