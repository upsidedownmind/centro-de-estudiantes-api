const express = require('express');
const router = express.Router();
const db = require('../dbs/db');
const validateBody = require('../middleware/validateBody');

const ENTITY = 'carreras';

/**
 * @openapi
 * /carreras:
 *   get:
 *     summary: Listar carreras
 *     tags:
 *       - Carreras
 *     responses:
 *       200:
 *         description: Lista de carreras
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Carrera'
 *             example:
 *               - id: 1
 *                 codigo: "TSP"
 *                 nombre: "Tecnicatura Superior en Programación"
 *               - id: 2
 *                 codigo: "TSE"
 *                 nombre: "Tecnicatura Superior en Enfermería"
 */
router.get('/', async (req, res) => {
  try {
    const result = await db.find(req.user, ENTITY);
    res.json(result);
  } catch (err) {
    if (err.code === 'DB_ERROR') return res.status(500).json({ error: err.message });
    throw err;
  }
});

/**
 * @openapi
 * /carreras:
 *   post:
 *     summary: Crear carrera
 *     tags:
 *       - Carreras
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CarreraInput'
 *           example:
 *             codigo: "TSD"
 *             nombre: "Tecnicatura Superior en Diseño"
 *     responses:
 *       201:
 *         description: Carrera creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Carrera'
 */
router.post('/', validateBody, async (req, res) => {
  try {
    const item = await db.create(req.user, ENTITY, req.body);
    res.status(201).json(item);
  } catch (err) {
    if (err.code === 'LIMIT_EXCEEDED') return res.status(403).json({ error: err.message });
    if (err.code === 'DB_ERROR') return res.status(500).json({ error: err.message });
    throw err;
  }
});

/**
 * @openapi
 * /carreras/{id}:
 *   get:
 *     summary: Obtener carrera por ID
 *     tags:
 *       - Carreras
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Carrera encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Carrera'
 *       404:
 *         description: Carrera no encontrada
 */
router.get('/:id', async (req, res) => {
  try {
    let item = await db.find(req.user, ENTITY, req.params.id);
    item = item[0];
    if (!item) return res.status(404).json({ error: 'No encontrado' });
    res.json(item);
  } catch (err) {
    if (err.code === 'DB_ERROR') return res.status(500).json({ error: err.message });
    throw err;
  }
});

/**
 * @openapi
 * /carreras/{id}:
 *   put:
 *     summary: Actualizar carrera
 *     tags:
 *       - Carreras
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CarreraInput'
 *           example:
 *             codigo: "TSP"
 *             nombre: "Tecnicatura Superior en Programación (actualizada)"
 *     responses:
 *       200:
 *         description: Carrera actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Carrera'
 *       404:
 *         description: Carrera no encontrada
 */
router.put('/:id', validateBody, async (req, res) => {
  try {
    const item = await db.update(req.user, ENTITY, req.params.id, req.body);
    if (!item) return res.status(404).json({ error: 'No encontrado' });
    res.json(item);
  } catch (err) {
    if (err.code === 'DB_ERROR') return res.status(500).json({ error: err.message });
    throw err;
  }
});

/**
 * @openapi
 * /carreras/{id}:
 *   delete:
 *     summary: Eliminar carrera
 *     tags:
 *       - Carreras
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Carrera eliminada
 *       404:
 *         description: Carrera no encontrada
 */
router.delete('/:id', async (req, res) => {
  try {
    const item = await db.delete(req.user, ENTITY, req.params.id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });
    res.json(item);
  } catch (err) {
    if (err.code === 'DB_ERROR') return res.status(500).json({ error: err.message });
    throw err;
  }
});

module.exports = router;
