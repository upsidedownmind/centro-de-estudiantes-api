const express = require('express');
const router = express.Router();
const db = require('../dbs/db');
const validateBody = require('../middleware/validateBody');

const ENTITY = 'usuarios';

/**
 * @openapi
 * /usuarios:
 *   get:
 *     summary: Listar usuarios
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *             example:
 *               - id: 1
 *                 dni: "40123456"
 *                 nombre: "Santiago Chiale"
 *                 usuario: "santiago"
 *                 email: "santiago.chiale@alumno.isfdyt57.edu.ar"
 *                 perfil_id: 1
 *                 carrera_id: 1
 *                 activo: true
 *                 created_at: "2026-01-15T10:00:00"
 *               - id: 2
 *                 dni: "30987654"
 *                 nombre: "María López"
 *                 usuario: "mlopez"
 *                 email: "maria.lopez@isfdyt57.edu.ar"
 *                 perfil_id: 2
 *                 carrera_id: null
 *                 activo: true
 *                 created_at: "2026-01-10T09:00:00"
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
 * /usuarios:
 *   post:
 *     summary: Crear usuario
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioInput'
 *           example:
 *             dni: "35111222"
 *             nombre: "Juan Pérez"
 *             usuario: "jperez"
 *             email: "juan.perez@alumno.isfdyt57.edu.ar"
 *             perfil_id: 1
 *             carrera_id: 1
 *             activo: true
 *     responses:
 *       201:
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
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
 * /usuarios/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
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
 * /usuarios/{id}:
 *   put:
 *     summary: Actualizar usuario
 *     tags:
 *       - Usuarios
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
 *             $ref: '#/components/schemas/UsuarioInput'
 *           example:
 *             dni: "40123456"
 *             nombre: "Santiago Chiale (actualizado)"
 *             usuario: "santiago"
 *             email: "santiago.chiale@alumno.isfdyt57.edu.ar"
 *             perfil_id: 1
 *             carrera_id: 1
 *             activo: true
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
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
 * /usuarios/{id}:
 *   delete:
 *     summary: Eliminar usuario
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       404:
 *         description: Usuario no encontrado
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
