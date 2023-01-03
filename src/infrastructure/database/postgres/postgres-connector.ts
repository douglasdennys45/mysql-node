import { ConnectionFailure } from '@/infrastructure/database/errors'
import { DbTransaction } from '@/interfaces/contracts'
import { Pool, PoolClient } from 'pg'

export class PostgresConnector implements DbTransaction {
  private static instance?: PostgresConnector
  private connection?: Pool
  private client?: PoolClient

  private constructor () {}

  static getInstance (): PostgresConnector {
    if (PostgresConnector.instance === undefined) PostgresConnector.instance = new PostgresConnector()
    return PostgresConnector.instance
  }

  async connect (): Promise<void> {
    this.connection = new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_SCHEMA,
      max: process.env.DB_MAX_CONNECTION ? +process.env.DB_MAX_CONNECTION : 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000
    })
    this.client = await this.connection.connect()
  }

  async disconnect (): Promise<void> {
    this.connectionFailure()
    await this.connection?.end()
    this.connection = undefined
  }

  async commit (): Promise<void> {
    this.connectionFailure()
    await this.connection?.query('COMMIT')
  }

  async rollback (): Promise<void> {
    this.connectionFailure()
    await this.connection?.query('ROLLBACK')
  }

  async openTransaction (): Promise<void> {
    this.connectionFailure()
    await this.connection?.query('BEGIN')
  }

  async closeTransaction (): Promise<void> {
    this.connectionFailure()
    await this.client?.release()
  }

  async prepare (query: string, body: any): Promise<any> {
    this.connectionFailure()
    const results = await this.connection?.query({
      text: query,
      values: body
    })
    return results?.rows
  }

  private connectionFailure (): void {
    if (this.connection == null) throw new ConnectionFailure()
  }
}
