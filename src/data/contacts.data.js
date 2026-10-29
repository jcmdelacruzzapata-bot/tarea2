let contacts = [
  { id: 1, name: 'julian duarte', phone: '+1 809-555-0101', email: 'juli@correo.com',
    category: 'family', favorite: true, createdAt: new Date().toISOString() },
  { id: 2, name: 'kevin durant', phone: '809-555-0102', email: null,
    category: 'friends', favorite: false, createdAt: new Date().toISOString() },
  { id: 3, name: 'juan Soto', phone: '(809) 555-0103', email: 'juan@empresa.com',
    category: 'work', favorite: false, createdAt: new Date().toISOString() },
];
let nextId = 4;

const getAll = () => contacts;

const getById = (id) => contacts.find((c) => c.id === id);

const getByPhone = (phone) => contacts.find((c) => c.phone === phone);

const create = ({ name, phone, email, category = 'other', favorite = false }) => {
  const contact = {
    id: nextId++, name, phone, email: email ?? null,
    category, favorite, createdAt: new Date().toISOString(),
  };
  contacts.push(contact);
  return contact;
};

const update = (id, data) => {
  const index = contacts.findIndex((c) => c.id === id);
  if (index === -1) return undefined;
  const old = contacts[index];
  // PUT reemplaza, pero conservamos id y createdAt (los genera la API)
  contacts[index] = {
    id: old.id,
    name: data.name,
    phone: data.phone,
    email: data.email ?? null,
    category: data.category ?? 'other',
    favorite: data.favorite ?? false,
    createdAt: old.createdAt,
  };
  return contacts[index];
};

const remove = (id) => {
  const index = contacts.findIndex((c) => c.id === id);
  if (index === -1) return false;
  contacts.splice(index, 1);
  return true;
};

module.exports = { getAll, getById, getByPhone, create, update, remove };