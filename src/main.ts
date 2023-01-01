import express, { Request, Response } from 'express'
import mysql, { PoolConnection } from 'mysql2/promise'

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: 3306,
  database: 'poc',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}

const app = express()

const connection = async (): Promise<PoolConnection> => {
  const getConnection = await mysql.createPool(dbConfig)
  return await getConnection.getConnection()
}

app.get('/', async (_: Request, res: Response) => {
  const conn = await connection()
  const query = 'SELECT * FROM users'
  const [results] = await conn.query(query)
  conn.release()
  return res.json(results)
})

app.listen(8080, () => console.log('starting server'))
