const data = require('../data/contacts.data');
const AppError = require('../utils/AppError');

const parseId = (req) => Number(req.params.id);

exports.getAll = (req, res) => {
  res.status(200).json(data.getAll());
};

exports.getById = (req, res, next) => {
  const contact = data.getById(parseId(req));
  if (!contact) return next(new AppError('Contacto no encontrado', 404));
  res.status(200).json(contact);
};

exports.create = (req, res, next) => {
  const phone = req.body.phone.trim();
  if (data.getByPhone(phone)) {
    return next(new AppError('Ya existe un contacto con ese teléfono', 409));
  }
  const contact = data.create({ ...req.body, phone, name: req.body.name.trim() });
  res.status(201).json(contact);
};

exports.update = (req, res, next) => {
  const id = parseId(req);
  if (!data.getById(id)) return next(new AppError('Contacto no encontrado', 404));

  const phone = req.body.phone.trim();
  const duplicate = data.getByPhone(phone);
  if (duplicate && duplicate.id !== id) { // ojo: puede conservar SU propio teléfono
    return next(new AppError('Ya existe un contacto con ese teléfono', 409));
  }
  const updated = data.update(id, { ...req.body, phone, name: req.body.name.trim() });
  res.status(200).json(updated);
};

exports.toggleFavorite = (req, res, next) => {
  const contact = data.getById(parseId(req));
  if (!contact) return next(new AppError('Contacto no encontrado', 404));
  contact.favorite = !contact.favorite;
  res.status(200).json(contact);
};

exports.remove = (req, res, next) => {
  if (!data.remove(parseId(req))) return next(new AppError('Contacto no encontrado', 404));
  res.status(204).send();
};

exports.stats = (req, res) => {
  const all = data.getAll();
  const byCategory = { family: 0, friends: 0, work: 0, other: 0 };
  all.forEach((c) => byCategory[c.category]++);
  res.status(200).json({
    clientId: req.clientId,
    total: all.length,
    favorites: all.filter((c) => c.favorite).length,
    byCategory,
  });
};