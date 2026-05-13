const express = require('express');
const router = express.Router();

let data = [
  { id: 1, tipo: 'resolucion', titulo: 'Resolución 2022-43193672 - Diseño Curricular Profesorado en Biología', descripcion: 'Resolución que establece el diseño curricular del Profesorado de Educación Secundaria en Biología.', archivo: 'Resolucion-2022-43193672.pdf', link: '', categoria: 'academica', palabras_clave: ['profesorado', 'biología', 'diseño curricular'], fecha_publicacion: '2022-06-15', version: '1.0' },
  { id: 2, tipo: 'reglamento', titulo: 'Reglamento Académico Institucional', descripcion: 'Reglamento que establece las normas académicas del instituto.', archivo: 'RAI.pdf', link: '', categoria: 'academica', palabras_clave: ['reglamento', 'académico', 'normas'], fecha_publicacion: '2023-03-01', version: '2.0' }
];
let nextId = 3;

/**
 * @openapi
 * /reglamentacion:
 *   get:
 *     summary: Listar documentos de reglamentación
 *     tags:
 *       - Reglamentación
 *     responses:
 *       200:
 *         description: Lista de documentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reglamentacion'
 *             example:
 *               - id: 1
 *                 tipo: "resolucion"
 *                 titulo: "Resolución 2022-43193672"
 *                 descripcion: "Resolución que establece el diseño curricular..."
 *                 archivo: "Resolucion-2022-43193672.pdf"
 *                 link: ""
 *                 categoria: "academica"
 *                 palabras_clave: ["profesorado", "biología"]
 *                 fecha_publicacion: "2022-06-15"
 *                 version: "1.0"
 */
router.get('/', (req, res) => {
  res.json(data);
});

/**
 * @openapi
 * /reglamentacion:
 *   post:
 *     summary: Crear documento de reglamentación
 *     tags:
 *       - Reglamentación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReglamentacionInput'
 *           example:
 *             tipo: "disposicion"
 *             titulo: "Disposición sobre régimen de correlatividades"
 *             descripcion: "Establece las correlatividades de las carreras."
 *             archivo: "correlatividades.pdf"
 *             link: ""
 *             categoria: "academica"
 *             palabras_clave: ["correlatividades", "materias"]
 *             fecha_publicacion: "2026-01-10"
 *             version: "1.0"
 *     responses:
 *       201:
 *         description: Documento creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reglamentacion'
 */
router.post('/', (req, res) => {
  const item = { id: nextId++, ...req.body };
  data.push(item);
  res.status(201).json(item);
});

/**
 * @openapi
 * /reglamentacion/{id}:
 *   put:
 *     summary: Actualizar documento de reglamentación
 *     tags:
 *       - Reglamentación
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
 *             $ref: '#/components/schemas/ReglamentacionInput'
 *           example:
 *             tipo: "resolucion"
 *             titulo: "Resolución actualizada"
 *             descripcion: "Descripción actualizada"
 *             archivo: "archivo.pdf"
 *             link: ""
 *             categoria: "academica"
 *             palabras_clave: ["actualizado"]
 *             fecha_publicacion: "2022-06-15"
 *             version: "2.0"
 *     responses:
 *       200:
 *         description: Documento actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reglamentacion'
 *       404:
 *         description: Documento no encontrado
 */
router.put('/:id', (req, res) => {
  const idx = data.findIndex(i => i.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' });
  data[idx] = { ...data[idx], ...req.body, id: data[idx].id };
  res.json(data[idx]);
});

/**
 * @openapi
 * /reglamentacion/{id}:
 *   delete:
 *     summary: Eliminar documento de reglamentación
 *     tags:
 *       - Reglamentación
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Documento eliminado
 *       404:
 *         description: Documento no encontrado
 */
router.delete('/:id', (req, res) => {
  const idx = data.findIndex(i => i.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' });
  const removed = data.splice(idx, 1);
  res.json(removed[0]);
});

module.exports = router;
