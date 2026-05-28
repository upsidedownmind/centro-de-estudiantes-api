const express = require('express');
const router = express.Router();
const db = require('../dbs/db');
const validateBody = require('../middleware/validateBody');

const ENTITY = 'notificaciones';

/**
 * @openapi
 * /notificaciones:
 *   get:
 *     summary: Listar notificaciones
 *     tags:
 *       - Notificaciones
 *     responses:
 *       200:
 *         description: Lista de notificaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notificacion'
 *             example:
 *               - id: 1
 *                 titulo: "Nueva mesa de examen disponible"
 *                 mensaje: "Se habilitó la inscripción a mesas de julio."
 *                 usuario_id: 1
 *                 leida: false
 *                 fecha: "2026-05-13T10:00:00"
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
 * /notificaciones:
 *   post:
 *     summary: Crear notificación
 *     tags:
 *       - Notificaciones
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NotificacionInput'
 *           example:
 *             titulo: "Nueva mesa de examen disponible"
 *             mensaje: "Se habilitó la inscripción a mesas de julio."
 *             usuario_id: 1
 *             leida: false
 *             fecha: "2026-05-13T10:00:00"
 *     responses:
 *       201:
 *         description: Notificación creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notificacion'
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
 * /notificaciones/{id}:
 *   get:
 *     summary: Obtener notificación por ID
 *     tags:
 *       - Notificaciones
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Notificación encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notificacion'
 *       404:
 *         description: Notificación no encontrada
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
 * /notificaciones/{id}:
 *   put:
 *     summary: Actualizar notificación
 *     tags:
 *       - Notificaciones
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
 *             $ref: '#/components/schemas/NotificacionInput'
 *           example:
 *             titulo: "Nueva mesa de examen disponible"
 *             mensaje: "Se habilitó la inscripción a mesas de julio."
 *             usuario_id: 1
 *             leida: true
 *             fecha: "2026-05-13T10:00:00"
 *     responses:
 *       200:
 *         description: Notificación actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notificacion'
 *       404:
 *         description: Notificación no encontrada
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
 * /notificaciones/{id}:
 *   delete:
 *     summary: Eliminar notificación
 *     tags:
 *       - Notificaciones
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Notificación eliminada
 *       404:
 *         description: Notificación no encontrada
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
