import { ConnectionFailure } from '@/infrastructure/database/errors'
import { DbTransaction } from '@/interfaces/contracts'
import { PoolConnection, createPool } from 'mysql2/promise'

export class MySQLConnector implements DbTransaction {
  private connection?: PoolConnection

  private constructor (private readonly dbConfig: any) {}

  async connect (): Promise<void> {
    const getConnection = await createPool(this.dbConfig)
    this.connection = await getConnection.getConnection()
  }

  async disconnect (): Promise<void> {
    this.connectionFailure()
    await this.connection?.destroy()
    this.connection = undefined
  }

  async commit (): Promise<void> {
    this.connectionFailure()
    await this.connection?.commit()
  }

  async rollback (): Promise<void> {
    this.connectionFailure()
    await this.connection?.rollback()
  }

  async openTransaction (): Promise<void> {
    this.connectionFailure()
    await this.connection?.beginTransaction()
  }

  async closeTransaction (): Promise<void> {
    this.connectionFailure()
    await this.connection?.release()
  }

  async prepare (query: any, body: any): Promise<any> {
    this.connectionFailure()
    const results = await this.connection?.execute(query, body)
    return results
  }

  private connectionFailure (): void {
    if (this.connection == null) throw new ConnectionFailure()
  }
}
