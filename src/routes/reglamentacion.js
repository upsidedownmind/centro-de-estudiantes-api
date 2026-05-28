const express = require('express');
const router = express.Router();
const db = require('../dbs/db');
const validateBody = require('../middleware/validateBody');

const ENTITY = 'reglamentacion';

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
 * /reglamentacion/{id}:
 *   get:
 *     summary: Obtener documento de reglamentación por ID
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
 *         description: Documento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reglamentacion'
 *       404:
 *         description: Documento no encontrado
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
