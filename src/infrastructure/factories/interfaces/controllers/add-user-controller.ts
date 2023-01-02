import { makeAddUser } from '@/infrastructure/factories/domain'
import { AddUserController, Controller } from '@/interfaces/controllers'

export const makeAddUserController = (): Controller => new AddUserController(makeAddUser())
