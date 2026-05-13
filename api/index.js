const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const { name, version } = require('../package.json');

const calendarioRouter = require('./routes/calendario');
const carrerasRouter = require('./routes/carreras');
const eventosRouter = require('./routes/eventos');
const notificacionesRouter = require('./routes/notificaciones');
const novedadesRouter = require('./routes/novedades');
const perfilesRouter = require('./routes/perfiles');
const reglamentacionRouter = require('./routes/reglamentacion');
const usuariosRouter = require('./routes/usuarios');

const app = express();

app.use(cors());
app.use(express.json());

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
  apis: [__filename, path.join(__dirname, 'routes', '*.js')]
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

app.use('/calendario', calendarioRouter);
app.use('/carreras', carrerasRouter);
app.use('/eventos', eventosRouter);
app.use('/notificaciones', notificacionesRouter);
app.use('/novedades', novedadesRouter);
app.use('/perfiles', perfilesRouter);
app.use('/reglamentacion', reglamentacionRouter);
app.use('/usuarios', usuariosRouter);

module.exports = app;

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}
