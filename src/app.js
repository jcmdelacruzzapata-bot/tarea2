const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const requestTimer = require('./middlewares/requestTimer');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const contactsRoutes = require('./routes/contacts.routes');

const app = express();

app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(morgan('dev'));
app.use(express.json());      // antes de las rutas
app.use(requestTimer);

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,   // 10 minutos
  max: 50,                    // (en v7+ también se acepta "limit")
  message: { error: 'Demasiadas peticiones, intenta de nuevo en 10 minutos' },
});

app.use('/contacts', limiter, contactsRoutes);

// SIEMPRE al final, en este orden
app.use(notFound);
app.use(errorHandler);

module.exports = app;