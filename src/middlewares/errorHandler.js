// Express reconoce un manejador de errores por tener EXACTAMENTE 4 parámetros
const errorHandler = (err, req, res, next) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  // JSON mal formado en el body
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'JSON inválido en el cuerpo de la petición' });
  }
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
};

module.exports = errorHandler;
