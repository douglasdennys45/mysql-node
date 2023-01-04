import { PostgresConnector } from '@/infrastructure/database/postgres'
import { IMemoryDb, newDb } from 'pg-mem'

export const makeFakeDb = async (entities?: any[]): Promise<IMemoryDb> => {
  const db = newDb()
  const connection = await db.adapters.createTypeormConnection({
    type: 'postgres',
    entities: entities ?? ['src/infrastructure/database/postgres/entities/index.ts']
  })
  await connection.synchronize()
  await PostgresConnector.getInstance().connect()
  return db
}