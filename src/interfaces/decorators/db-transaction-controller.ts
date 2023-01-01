import { DbTransaction, HttpRequest, HttpResponse } from '@/interfaces/contracts'
import { Controller } from '@/interfaces/controllers'

export class DbTransactionController extends Controller {
  constructor (
    private readonly decorate: Controller,
    private readonly db: DbTransaction
  ) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.db.openTransaction()
    try {
      const httpResponse = await this.decorate.perform(httpRequest)
      await this.db.commit()
      return httpResponse
    } catch (error) {
      await this.db.rollback()
      throw error
    } finally {
      await this.db.closeTransaction()
    }
  }
}
