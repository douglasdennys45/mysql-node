import { AddUserRepo } from '@/domain/contracts'
import { PostgresConnector } from './postgres-connector'

export class UserRepository implements AddUserRepo {
  private readonly client: PostgresConnector

  constructor () {
    this.client = PostgresConnector.getInstance()
  }

  async add (body: AddUserRepo.Request): Promise<AddUserRepo.Response> {
    const [results] = await this.client.prepare('INSERT INTO users (name) VALUES ($1) RETURNING *', [body.name])
    return results
  }
}
