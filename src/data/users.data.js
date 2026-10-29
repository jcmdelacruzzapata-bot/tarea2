const bcrypt = require('bcryptjs');

let users = [];
let nextId = 1;

// Devuelve una copia del usuario SIN passwordHash. Úsala en toda respuesta.
const toPublic = (user) => {
  const { passwordHash, ...safe } = user;
  return safe;
};

const findByEmail = (email) =>
  users.find((u) => u.email.toLowerCase() === email.toLowerCase());

const findById = (id) => users.find((u) => u.id === id);

const findAll = () => users;

// Recibe passwordHash (nunca password). El role es 'member' salvo que
// quien llame (seedAdmin) indique otro. Nunca viene del body.
const create = ({ name, email, passwordHash, role = 'member' }) => {
  const user = {
    id: nextId++,
    name,
    email,
    passwordHash,
    role,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  return user;
};

const seedAdmin = async () => {
   if (findByEmail(process.env.ADMIN_EMAIL)) return;

  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

  create({
    name: 'Admin',
    email: process.env.ADMIN_EMAIL,
    passwordHash,
    role: 'admin',
  });
};


module.exports = { toPublic, findByEmail, findById, findAll, create, seedAdmin };