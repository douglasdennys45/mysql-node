import { AddUserRepo } from '@/domain/contracts'
import { PostgresRepository, PgUser } from '@/infrastructure/database/postgres'

export class UserRepository extends PostgresRepository implements AddUserRepo {
  async add (body: AddUserRepo.Request): Promise<AddUserRepo.Response> {
    const repo = this.getRepository(PgUser)
    return await repo.save(body)
  }
}
