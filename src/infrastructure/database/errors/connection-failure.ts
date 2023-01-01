export class ConnectionFailure extends Error {
  constructor () {
    super('No connection was found')
    this.name = 'ConnectionFailure'
  }
}
