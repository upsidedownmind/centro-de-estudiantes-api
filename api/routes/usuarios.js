const express = require('express');
const router = express.Router();

let data = [
  { id: 1, dni: '40123456', nombre: 'Santiago Chiale', usuario: 'santiago', email: 'santiago.chiale@alumno.isfdyt57.edu.ar', perfil_id: 1, carrera_id: 1, activo: true, created_at: '2026-01-15T10:00:00' },
  { id: 2, dni: '30987654', nombre: 'María López', usuario: 'mlopez', email: 'maria.lopez@isfdyt57.edu.ar', perfil_id: 2, carrera_id: null, activo: true, created_at: '2026-01-10T09:00:00' }
];
let nextId = 3;

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
router.get('/', (req, res) => {
  res.json(data);
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
router.post('/', (req, res) => {
  const item = { id: nextId++, ...req.body, created_at: new Date().toISOString() };
  data.push(item);
  res.status(201).json(item);
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
router.put('/:id', (req, res) => {
  const idx = data.findIndex(i => i.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' });
  data[idx] = { ...data[idx], ...req.body, id: data[idx].id };
  res.json(data[idx]);
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
router.delete('/:id', (req, res) => {
  const idx = data.findIndex(i => i.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' });
  const removed = data.splice(idx, 1);
  res.json(removed[0]);
});

module.exports = router;
