import { app } from './app'

// Utils
import { db } from './util/database'
import { initModels } from './util/initModels'

db.authenticate()
  .then(() => console.log('Database authenticated'))
  .catch((err) => console.error(err))

initModels()

db.sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.error(err))

const PORT = typeof process.env.PORT === 'string' ? process.env.PORT : 4000

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`)
})
