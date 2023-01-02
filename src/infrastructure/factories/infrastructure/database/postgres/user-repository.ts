import { UserRepository } from '@/infrastructure/database/postgres'

export const makeUserRepository = (): UserRepository => new UserRepository()
