import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config({ path: './.env' })

const db = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  port: 5432,
  dialect: 'postgres',
  logging: false
})

export { db }
