import { PostgresConnector } from '@/infrastructure/database/postgres'
import { ObjectType, Repository } from 'typeorm'

export abstract class PostgresRepository {
  constructor (private readonly connection: PostgresConnector = PostgresConnector.getInstance()) {}

  getRepository (entity: ObjectType<any>): Repository<any> {
    return this.connection.getRepository(entity)
  }
}