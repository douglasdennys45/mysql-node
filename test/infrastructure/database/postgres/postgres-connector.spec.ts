import { ConnectionFailure } from '@/infrastructure/database/errors'
import { PostgresConnector } from '@/infrastructure/database/postgres'
import { Pool, PoolClient } from 'pg'
import { mocked } from 'jest-mock'

jest.mock('pg', () => ({
  Pool: jest.fn()
}))

describe('PostgresConnector', () => {
  let dbConfig: any
  let disconnectSpy: jest.Mock
  let connectSpy: jest.Mock
  let connectionSpy: jest.Mock
  //let clientSpy: jest.Mock
  let querySpy: jest.Mock
  let releaseSpy: jest.Mock
  let sut: PostgresConnector

  beforeAll(() => {
    dbConfig = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_SCHEMA,
      max: process.env.DB_MAX_CONNECTION ? +process.env.DB_MAX_CONNECTION : 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000
    }
    connectSpy = jest.fn()
    disconnectSpy = jest.fn()
    querySpy = jest.fn()
    releaseSpy = jest.fn()
    connectionSpy = jest.fn().mockReturnValue({
      connect: connectSpy,
      end: disconnectSpy,
      query: querySpy
    })
    /*clientSpy = jest.fn().mockReturnValue({
      release: releaseSpy
    })*/
    mocked(Pool).mockImplementation(connectionSpy)
    //mocked().mockImplementation(clientSpy)
  })

  beforeEach(() => {
    sut = PostgresConnector.getInstance()
  })

  it('should have only one instance', () => {
    const sut2 = PostgresConnector.getInstance()
    expect(sut).toBe(sut2)
  })

  it('should create a new connection', async () => {
    await sut.connect()
    expect(connectionSpy).toHaveBeenCalledWith(dbConfig)
    expect(connectionSpy).toHaveBeenCalledTimes(1)
  })

  it('should use an existing connection', async () => {
    await sut.connect()
    expect(connectionSpy).toHaveBeenCalledWith(dbConfig)
    expect(connectionSpy).toHaveBeenCalledTimes(1)
  })

  it('should close connection', async () => {
    await sut.connect()
    await sut.disconnect()
    expect(disconnectSpy).toHaveBeenCalledWith()
    expect(disconnectSpy).toHaveBeenCalledTimes(1)
  })

  it('should return ConnectionFailure on disconnect if connection is not found', async () => {
    const promise = sut.disconnect()
    expect(disconnectSpy).not.toHaveBeenCalled()
    await expect(promise).rejects.toThrow(new ConnectionFailure())
  })

  it('should open transaction', async () => {
    await sut.connect()
    await sut.openTransaction()
    expect(querySpy).toHaveBeenCalledWith('BEGIN')
    expect(querySpy).toHaveBeenCalledTimes(1)
    expect(connectionSpy).toHaveBeenCalledWith(dbConfig)
    expect(connectionSpy).toHaveBeenCalledTimes(1)
  })

  /* Aqui precisamos utilizar o query closeTransaction
  it('should close transaction', async () => { 
    await sut.connect()
    await sut.openTransaction()
    await sut.closeTransaction()
    expect(releaseSpy).toHaveBeenCalledWith()
    expect(releaseSpy).toHaveBeenCalledTimes(1)
    await sut.disconnect()
  }) */

  it('should commit transaction', async () => {
    await sut.connect()
    await sut.openTransaction()
    await sut.commit()
    expect(querySpy).toHaveBeenCalledWith('COMMIT')
    expect(querySpy).toHaveBeenCalledTimes(2)
    await sut.disconnect()
  })

  it('should rollback transaction', async () => {
    await sut.connect()
    await sut.openTransaction()
    await sut.rollback()
    expect(querySpy).toHaveBeenCalledWith('ROLLBACK')
    expect(querySpy).toHaveBeenCalledTimes(2)
    await sut.disconnect()
  })

  it('should prepare', async () => {
    await sut.connect()
    await sut.prepare('SELECT 1+1 AS result', null)
    expect(querySpy).toHaveBeenCalledWith({ text: 'SELECT 1+1 AS result', values: null })
    expect(querySpy).toHaveBeenCalledTimes(1)
    await sut.disconnect()
  })
})