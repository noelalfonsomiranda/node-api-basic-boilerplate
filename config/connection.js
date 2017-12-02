const Sequelize = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()

const development = {
  use_env_variable: process.env.DATABASE_URL,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op
}

const test = {
  use_env_variable: process.env.TEST_DATABASE_URL,
  database: process.env.TEST_DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op
}

const production = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op
}

module.exports = {
  development,
  test,
  production
}
