import { AddUser as IAddUser } from '@/domain/contracts'
import { AddUser } from '@/domain/use-cases'
import { makeUserRepository } from '@/infrastructure/factories/infrastructure/database'

export const makeAddUser = (): IAddUser => new AddUser(makeUserRepository())
