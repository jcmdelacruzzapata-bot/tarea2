require('dotenv').config();
const app = require('./app');
const { seedAdmin } = require ('./data/users.data');
const PORT = process.env.PORT || 3000;

seedAdmin().then(() => {
  app.listen(PORT, () => console.log(`Contact Book API en http://localhost:${PORT}`));
});