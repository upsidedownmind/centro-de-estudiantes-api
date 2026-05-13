const express = require('express');
const router = express.Router();
const db = require('../dbs/mockdb');
const validateBody = require('../middleware/validateBody');

const ENTITY = 'perfiles';

/**
 * @openapi
 * /perfiles:
 *   get:
 *     summary: Listar perfiles
 *     tags:
 *       - Perfiles
 *     responses:
 *       200:
 *         description: Lista de perfiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Perfil'
 *             example:
 *               - id: 1
 *                 nombre: "estudiante"
 *                 descripcion: "Alumno regular del instituto"
 *               - id: 2
 *                 nombre: "docente"
 *                 descripcion: "Docente del instituto"
 */
router.get('/', async (req, res) => {
  const result = await db.find(req.user, ENTITY);
  res.json(result);
});

/**
 * @openapi
 * /perfiles:
 *   post:
 *     summary: Crear perfil
 *     tags:
 *       - Perfiles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PerfilInput'
 *           example:
 *             nombre: "preceptor"
 *             descripcion: "Preceptor del instituto"
 *     responses:
 *       201:
 *         description: Perfil creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Perfil'
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
 * /perfiles/{id}:
 *   get:
 *     summary: Obtener perfil por ID
 *     tags:
 *       - Perfiles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Perfil encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Perfil'
 *       404:
 *         description: Perfil no encontrado
 */
router.get('/:id', async (req, res) => {
  let item = await db.find(req.user, ENTITY, req.params.id);
  item = item[0];
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  res.json(item);
});

/**
 * @openapi
 * /perfiles/{id}:
 *   put:
 *     summary: Actualizar perfil
 *     tags:
 *       - Perfiles
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
 *             $ref: '#/components/schemas/PerfilInput'
 *           example:
 *             nombre: "estudiante"
 *             descripcion: "Alumno regular del instituto (actualizado)"
 *     responses:
 *       200:
 *         description: Perfil actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Perfil'
 *       404:
 *         description: Perfil no encontrado
 */
router.put('/:id', validateBody, async (req, res) => {
  const item = await db.update(req.user, ENTITY, req.params.id, req.body);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  res.json(item);
});

/**
 * @openapi
 * /perfiles/{id}:
 *   delete:
 *     summary: Eliminar perfil
 *     tags:
 *       - Perfiles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Perfil eliminado
 *       404:
 *         description: Perfil no encontrado
 */
router.delete('/:id', async (req, res) => {
  const item = await db.delete(req.user, ENTITY, req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  res.json(item);
});

module.exports = router;
