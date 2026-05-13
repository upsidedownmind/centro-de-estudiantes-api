const express = require('express');
const router = express.Router();

let data = [
  { id: 1, nombre: 'estudiante', descripcion: 'Alumno regular del instituto' },
  { id: 2, nombre: 'docente', descripcion: 'Docente del instituto' },
  { id: 3, nombre: 'admin', descripcion: 'Administrador del sistema' }
];
let nextId = 4;

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
router.get('/', (req, res) => {
  res.json(data);
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
router.post('/', (req, res) => {
  const item = { id: nextId++, ...req.body };
  data.push(item);
  res.status(201).json(item);
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
router.put('/:id', (req, res) => {
  const idx = data.findIndex(i => i.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' });
  data[idx] = { ...data[idx], ...req.body, id: data[idx].id };
  res.json(data[idx]);
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
router.delete('/:id', (req, res) => {
  const idx = data.findIndex(i => i.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' });
  const removed = data.splice(idx, 1);
  res.json(removed[0]);
});

module.exports = router;
