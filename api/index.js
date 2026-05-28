require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const { name, version } = require('../package.json');
const schemas = require('../src/routes/schemas');

const calendarioRouter = require('../src/routes/calendario');
const carrerasRouter = require('../src/routes/carreras');
const eventosRouter = require('../src/routes/eventos');
const notificacionesRouter = require('../src/routes/notificaciones');
const novedadesRouter = require('../src/routes/novedades');
const perfilesRouter = require('../src/routes/perfiles');
const reglamentacionRouter = require('../src/routes/reglamentacion');
const usuariosRouter = require('../src/routes/usuarios');
const basicAuth = require('../src/middleware/basicAuth');

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
  servers: [{ url: '/' }],
  components: {
    securitySchemes: {
      basicAuth: {
        type: 'http',
        scheme: 'basic'
      }
    },
    schemas
  },
  security: [{ basicAuth: [] }]
};

const specs = swaggerJsdoc({
  definition: swaggerDefinition,
  apis: [__filename, path.join(__dirname, '..', 'src', 'routes', '*.js')]
});

// Serve OpenAPI spec as JSON
app.get('/api-docs/swagger.json', (req, res) => {
  res.set('Cache-Control', 'no-store');
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

app.use('/calendario', basicAuth, calendarioRouter);
app.use('/carreras', basicAuth, carrerasRouter);
app.use('/eventos', basicAuth, eventosRouter);
app.use('/notificaciones', basicAuth, notificacionesRouter);
app.use('/novedades', basicAuth, novedadesRouter);
app.use('/perfiles', basicAuth, perfilesRouter);
app.use('/reglamentacion', basicAuth, reglamentacionRouter);
app.use('/usuarios', basicAuth, usuariosRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.code === 'PAYLOAD_TOO_LARGE') return res.status(413).json({ error: err.message });
  next(err);
});

module.exports = app;

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}
