const express = require('express');
const router = express.Router();

let data = [
  { id: 1, titulo: 'Workshop de Python para Data Science', descripcion: 'Taller intensivo de 3 jornadas sobre las librerías esenciales del ecosistema Python para Ciencia de Datos.', fecha_inicio: '2026-05-05T18:00:00', fecha_fin: '2026-05-07T21:00:00', cupo: 40, inscriptos: 38, autor_id: 2, autor: 'Secretaría Académica', estado: 'abierto', categoria: 'taller', lugar: 'Laboratorio 3', color: '#3A5BA9', imagen: '' },
  { id: 2, titulo: 'Torneo Intercarreras de Fútbol', descripcion: 'Torneo de fútbol 5 entre las distintas carreras del instituto.', fecha_inicio: '2026-05-10T10:00:00', fecha_fin: '2026-05-10T18:00:00', cupo: 80, inscriptos: 64, autor_id: 3, autor: 'Centro de Estudiantes', estado: 'abierto', categoria: 'deportivo', lugar: 'Cancha sintética', color: '#E67E5B', imagen: '' }
];
let nextId = 3;

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
router.get('/', (req, res) => {
  res.json(data);
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
router.post('/', (req, res) => {
  const item = { id: nextId++, ...req.body };
  data.push(item);
  res.status(201).json(item);
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
router.put('/:id', (req, res) => {
  const idx = data.findIndex(i => i.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' });
  data[idx] = { ...data[idx], ...req.body, id: data[idx].id };
  res.json(data[idx]);
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
router.delete('/:id', (req, res) => {
  const idx = data.findIndex(i => i.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' });
  const removed = data.splice(idx, 1);
  res.json(removed[0]);
});

module.exports = router;
