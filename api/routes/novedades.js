const express = require('express');
const router = express.Router();
const db = require('../dbs/mockdb');
const validateBody = require('../middleware/validateBody');

const ENTITY = 'novedades';

/**
 * @openapi
 * /novedades:
 *   get:
 *     summary: Listar novedades
 *     tags:
 *       - Novedades
 *     responses:
 *       200:
 *         description: Lista de novedades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Novedad'
 *             example:
 *               - id: 1
 *                 titulo: "Apertura de inscripciones a mesas de exámenes de Julio"
 *                 contenido: "Ya se encuentra disponible el sistema de inscripción..."
 *                 categoria_id: 1
 *                 categoria: "Académico"
 *                 autor_id: 2
 *                 autor: "Secretaría Académica"
 *                 materia_id: null
 *                 carrera_id: null
 *                 destacada: true
 *                 fecha: "2026-05-01"
 *                 adjunto: ""
 *                 icono: ""
 */
router.get('/', async (req, res) => {
  const result = await db.find(req.user, ENTITY);
  res.json(result);
});

/**
 * @openapi
 * /novedades:
 *   post:
 *     summary: Crear novedad
 *     tags:
 *       - Novedades
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovedadInput'
 *           example:
 *             titulo: "Cambio de horario en Laboratorio 2"
 *             contenido: "Se informa que el Laboratorio 2 cambia su horario de apertura."
 *             categoria_id: 1
 *             categoria: "Académico"
 *             autor_id: 2
 *             autor: "Secretaría Académica"
 *             materia_id: null
 *             carrera_id: 1
 *             destacada: false
 *             fecha: "2026-05-13"
 *             adjunto: ""
 *             icono: ""
 *     responses:
 *       201:
 *         description: Novedad creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Novedad'
 */
router.post('/', validateBody, async (req, res) => {
  try {
    const item = await db.create(req.user, ENTITY, req.body);
    res.status(201).json(item);
  } catch (err) {
    if (err.code === 'LIMIT_EXCEEDED') return res.status(403).json({ error: err.message });
    throw err;
  }
});

/**
 * @openapi
 * /novedades/{id}:
 *   get:
 *     summary: Obtener novedad por ID
 *     tags:
 *       - Novedades
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Novedad encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Novedad'
 *       404:
 *         description: Novedad no encontrada
 */
router.get('/:id', async (req, res) => {
  let item = await db.find(req.user, ENTITY, req.params.id);
  item = item[0];
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  res.json(item);
});

/**
 * @openapi
 * /novedades/{id}:
 *   put:
 *     summary: Actualizar novedad
 *     tags:
 *       - Novedades
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
 *             $ref: '#/components/schemas/NovedadInput'
 *           example:
 *             titulo: "Apertura de inscripciones (actualizado)"
 *             contenido: "Contenido actualizado"
 *             categoria_id: 1
 *             categoria: "Académico"
 *             autor_id: 2
 *             autor: "Secretaría Académica"
 *             materia_id: null
 *             carrera_id: null
 *             destacada: true
 *             fecha: "2026-05-01"
 *             adjunto: ""
 *             icono: ""
 *     responses:
 *       200:
 *         description: Novedad actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Novedad'
 *       404:
 *         description: Novedad no encontrada
 */
router.put('/:id', validateBody, async (req, res) => {
  const item = await db.update(req.user, ENTITY, req.params.id, req.body);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  res.json(item);
});

/**
 * @openapi
 * /novedades/{id}:
 *   delete:
 *     summary: Eliminar novedad
 *     tags:
 *       - Novedades
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Novedad eliminada
 *       404:
 *         description: Novedad no encontrada
 */
router.delete('/:id', async (req, res) => {
  const item = await db.delete(req.user, ENTITY, req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  res.json(item);
});

module.exports = router;
