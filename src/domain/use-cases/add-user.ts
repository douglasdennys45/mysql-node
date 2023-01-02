import { AddUserRepo, AddUser as IAddUser } from '@/domain/contracts'
import { User } from '@/domain/entities'

export class AddUser implements IAddUser {
  constructor (private readonly repo: AddUserRepo) {}

  async perform (body: IAddUser.Request): Promise<IAddUser.Response> {
    const user = new User(body)
    return await this.repo.add(user.create())
  }
}
