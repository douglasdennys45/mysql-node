import { ConnectionFailure } from '@/infrastructure/database/postgres'
import { DbTransaction } from '@/interfaces/contracts'
import { Connection, getConnectionManager, getConnection, createConnection, QueryRunner, ObjectType, Repository, getRepository } from 'typeorm'

export class PostgresConnector implements DbTransaction {
  private static instance?: PostgresConnector
  private connection?: Connection
  private query?: QueryRunner

  private constructor () {}

  static getInstance (): PostgresConnector {
    if (PostgresConnector.instance === undefined) PostgresConnector.instance = new PostgresConnector()
    return PostgresConnector.instance
  }

  async connect (): Promise<void> {
    this.connection = getConnectionManager().has('default') ? getConnection() : await createConnection()
  }

  async disconnect (): Promise<void> {
    this.connectionFailure()
    await getConnection().close()
    this.query = undefined
    this.connection = undefined
  }

  async commit (): Promise<void> {
    this.connectionFailure()
    await this.query?.commitTransaction()
  }

  async rollback (): Promise<void> {
    this.connectionFailure()
    await this.query?.rollbackTransaction()
  }

  async openTransaction (): Promise<void> {
    this.connectionFailure()
    this.query = this.connection?.createQueryRunner()
    await this.query?.startTransaction()
  }

  async closeTransaction (): Promise<void> {
    this.connectionFailure()
    await this.query?.release()
  }

  getRepository (entity: ObjectType<any>): Repository<any> {
    if (this.connection === null) throw new ConnectionFailure()
    if (this.query !== undefined) return this.query.manager.getRepository(entity)
    return getRepository(entity)
  }

  private connectionFailure (): void {
    if (this.connection === undefined) throw new ConnectionFailure()
  }
}
