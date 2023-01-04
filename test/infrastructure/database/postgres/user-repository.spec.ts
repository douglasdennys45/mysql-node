import { PgUser, PostgresConnector, UserRepository } from '@/infrastructure/database/postgres'
import { faker } from '@faker-js/faker'
import { makeFakeDb } from '@/test/infrastructure/database/postgres/mocks'
import { IBackup } from 'pg-mem'

describe('UserRepository', () => {
  let sut: UserRepository
  let connection: PostgresConnector
  let body: any
  let backup: IBackup

  beforeAll(async () => {
    body = {
      name: faker.name.fullName()
    }
    connection = PostgresConnector.getInstance()
    const db = await makeFakeDb([PgUser])
    backup = db.backup()
  })

  beforeEach(() => {
    backup.restore()
    sut = new UserRepository()
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  describe('add', () => { 
    it('should create user', async () => {
      const results = await sut.add(body)
      expect(results).toBeTruthy()
    })
  })
})