const express = require('express');
const router = express.Router();

let data = [];
let nextId = 1;

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
router.get('/', (req, res) => {
  res.json(data);
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
router.post('/', (req, res) => {
  const item = { id: nextId++, ...req.body };
  data.push(item);
  res.status(201).json(item);
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
router.put('/:id', (req, res) => {
  const idx = data.findIndex(i => i.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' });
  data[idx] = { ...data[idx], ...req.body, id: data[idx].id };
  res.json(data[idx]);
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
router.delete('/:id', (req, res) => {
  const idx = data.findIndex(i => i.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' });
  const removed = data.splice(idx, 1);
  res.json(removed[0]);
});

module.exports = router;
