const express = require('express');
const router = express.Router();
const db = require('../dbs/db');
const validateBody = require('../middleware/validateBody');

const ENTITY = 'calendario';

/**
 * @openapi
 * /calendario:
 *   get:
 *     summary: Listar eventos del calendario
 *     tags:
 *       - Calendario
 *     responses:
 *       200:
 *         description: Lista de eventos del calendario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Calendario'
 *             example:
 *               - id: 1
 *                 fecha: "2026-01-01"
 *                 titulo: "Feriado: Año Nuevo"
 *                 tipo: "feriado"
 *                 color: "#E67E5B"
 *               - id: 2
 *                 fecha: "2026-02-16"
 *                 titulo: "Feriado: Carnaval"
 *                 tipo: "feriado"
 *                 color: "#E67E5B"
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
 * /calendario:
 *   post:
 *     summary: Crear evento de calendario
 *     tags:
 *       - Calendario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CalendarioInput'
 *           example:
 *             fecha: "2026-06-20"
 *             titulo: "Feriado: Día de la Bandera"
 *             tipo: "feriado"
 *             color: "#E67E5B"
 *     responses:
 *       201:
 *         description: Evento creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Calendario'
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
 * /calendario/{id}:
 *   get:
 *     summary: Obtener evento de calendario por ID
 *     tags:
 *       - Calendario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Evento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Calendario'
 *       404:
 *         description: Evento no encontrado
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
 * /calendario/{id}:
 *   put:
 *     summary: Actualizar evento de calendario
 *     tags:
 *       - Calendario
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
 *             $ref: '#/components/schemas/CalendarioInput'
 *           example:
 *             fecha: "2026-01-01"
 *             titulo: "Feriado: Año Nuevo (actualizado)"
 *             tipo: "feriado"
 *             color: "#E67E5B"
 *     responses:
 *       200:
 *         description: Evento actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Calendario'
 *       404:
 *         description: Evento no encontrado
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
 * /calendario/{id}:
 *   delete:
 *     summary: Eliminar evento de calendario
 *     tags:
 *       - Calendario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Evento eliminado
 *       404:
 *         description: Evento no encontrado
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
