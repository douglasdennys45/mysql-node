module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [
    `${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/infrastructure/database/postgres/entities/index.{js,ts}`
  ]
}