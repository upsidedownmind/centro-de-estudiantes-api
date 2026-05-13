const express = require('express');
const router = express.Router();

let data = [
  { id: 1, fecha: '2026-01-01', titulo: 'Feriado: Año Nuevo', tipo: 'feriado', color: '#E67E5B' },
  { id: 2, fecha: '2026-02-16', titulo: 'Feriado: Carnaval', tipo: 'feriado', color: '#E67E5B' },
  { id: 3, fecha: '2026-03-02', titulo: 'Inscripción a materias', tipo: 'inscripcion', color: '#3DAA6A' },
  { id: 4, fecha: '2026-03-16', titulo: 'Inicio de clases', tipo: 'academico', color: '#F5A623' }
];
let nextId = 5;

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
router.get('/', (req, res) => {
  res.json(data);
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
router.post('/', (req, res) => {
  const item = { id: nextId++, ...req.body };
  data.push(item);
  res.status(201).json(item);
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
router.put('/:id', (req, res) => {
  const idx = data.findIndex(i => i.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' });
  data[idx] = { ...data[idx], ...req.body, id: data[idx].id };
  res.json(data[idx]);
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
router.delete('/:id', (req, res) => {
  const idx = data.findIndex(i => i.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' });
  const removed = data.splice(idx, 1);
  res.json(removed[0]);
});

module.exports = router;
