function validateBody(req, res, next) {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'El cuerpo de la solicitud no puede estar vacío' });
  }
  next();
}

module.exports = validateBody;
