const express = require('express');
const router = express.Router();

let data = [
  { id: 1, codigo: 'TSP', nombre: 'Tecnicatura Superior en Programación' },
  { id: 2, codigo: 'TSE', nombre: 'Tecnicatura Superior en Enfermería' },
  { id: 3, codigo: 'PEB', nombre: 'Profesorado de Educación Secundaria en Biología' }
];
let nextId = 4;

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
router.get('/', (req, res) => {
  res.json(data);
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
router.post('/', (req, res) => {
  const item = { id: nextId++, ...req.body };
  data.push(item);
  res.status(201).json(item);
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
router.put('/:id', (req, res) => {
  const idx = data.findIndex(i => i.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' });
  data[idx] = { ...data[idx], ...req.body, id: data[idx].id };
  res.json(data[idx]);
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
router.delete('/:id', (req, res) => {
  const idx = data.findIndex(i => i.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' });
  const removed = data.splice(idx, 1);
  res.json(removed[0]);
});

module.exports = router;
