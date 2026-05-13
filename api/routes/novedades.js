const express = require('express');
const router = express.Router();

let data = [
  { id: 1, titulo: 'Apertura de inscripciones a mesas de exámenes de Julio', contenido: 'Ya se encuentra disponible el sistema de inscripción a las mesas de examen del turno Julio 2026. El cierre es el 10/07.', categoria_id: 1, categoria: 'Académico', autor_id: 2, autor: 'Secretaría Académica', materia_id: null, carrera_id: null, destacada: true, fecha: '2026-05-01', adjunto: '', icono: '' },
  { id: 2, titulo: 'Jornada solidaria: colecta de útiles escolares', contenido: 'El Centro de Estudiantes organiza una colecta de útiles escolares para escuelas rurales.', categoria_id: 3, categoria: 'Social', autor_id: 3, autor: 'Centro de Estudiantes', materia_id: null, carrera_id: null, destacada: false, fecha: '2026-04-20', adjunto: '', icono: '' }
];
let nextId = 3;

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
router.get('/', (req, res) => {
  res.json(data);
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
router.post('/', (req, res) => {
  const item = { id: nextId++, ...req.body };
  data.push(item);
  res.status(201).json(item);
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
router.put('/:id', (req, res) => {
  const idx = data.findIndex(i => i.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' });
  data[idx] = { ...data[idx], ...req.body, id: data[idx].id };
  res.json(data[idx]);
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
router.delete('/:id', (req, res) => {
  const idx = data.findIndex(i => i.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' });
  const removed = data.splice(idx, 1);
  res.json(removed[0]);
});

module.exports = router;
