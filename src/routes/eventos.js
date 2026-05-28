const express = require('express');
const router = express.Router();
const db = require('../dbs/db');
const validateBody = require('../middleware/validateBody');

const ENTITY = 'eventos';

/**
 * @openapi
 * /eventos:
 *   get:
 *     summary: Listar eventos
 *     tags:
 *       - Eventos
 *     responses:
 *       200:
 *         description: Lista de eventos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Evento'
 *             example:
 *               - id: 1
 *                 titulo: "Workshop de Python para Data Science"
 *                 descripcion: "Taller intensivo de 3 jornadas"
 *                 fecha_inicio: "2026-05-05T18:00:00"
 *                 fecha_fin: "2026-05-07T21:00:00"
 *                 cupo: 40
 *                 inscriptos: 38
 *                 autor_id: 2
 *                 autor: "Secretaría Académica"
 *                 estado: "abierto"
 *                 categoria: "taller"
 *                 lugar: "Laboratorio 3"
 *                 color: "#3A5BA9"
 *                 imagen: ""
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
 * /eventos:
 *   post:
 *     summary: Crear evento
 *     tags:
 *       - Eventos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventoInput'
 *           example:
 *             titulo: "Charla de Ciberseguridad"
 *             descripcion: "Charla abierta sobre buenas prácticas en seguridad informática."
 *             fecha_inicio: "2026-06-15T18:00:00"
 *             fecha_fin: "2026-06-15T20:00:00"
 *             cupo: 60
 *             inscriptos: 0
 *             autor_id: 2
 *             autor: "Secretaría Académica"
 *             estado: "abierto"
 *             categoria: "charla"
 *             lugar: "Aula Magna"
 *             color: "#3A5BA9"
 *             imagen: ""
 *     responses:
 *       201:
 *         description: Evento creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evento'
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
 * /eventos/{id}:
 *   get:
 *     summary: Obtener evento por ID
 *     tags:
 *       - Eventos
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
 *               $ref: '#/components/schemas/Evento'
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
 * /eventos/{id}:
 *   put:
 *     summary: Actualizar evento
 *     tags:
 *       - Eventos
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
 *             $ref: '#/components/schemas/EventoInput'
 *           example:
 *             titulo: "Workshop de Python para Data Science (actualizado)"
 *             descripcion: "Taller intensivo actualizado"
 *             fecha_inicio: "2026-05-05T18:00:00"
 *             fecha_fin: "2026-05-07T21:00:00"
 *             cupo: 50
 *             inscriptos: 38
 *             autor_id: 2
 *             autor: "Secretaría Académica"
 *             estado: "abierto"
 *             categoria: "taller"
 *             lugar: "Laboratorio 3"
 *             color: "#3A5BA9"
 *             imagen: ""
 *     responses:
 *       200:
 *         description: Evento actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evento'
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
 * /eventos/{id}:
 *   delete:
 *     summary: Eliminar evento
 *     tags:
 *       - Eventos
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
