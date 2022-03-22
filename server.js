const { app } = require('./app');

// Utils
const { db } = require('./util/database');
const { initModels } = require('./util/initModels');

db.authenticate()
  .then(() => console.log('Database authenticated'))
  .catch((err) => console.error(err));

initModels();

db.sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});
