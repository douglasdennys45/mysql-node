export class User {
  constructor (private readonly data: any) {}

  create (): any {
    return this.data
  }
}
