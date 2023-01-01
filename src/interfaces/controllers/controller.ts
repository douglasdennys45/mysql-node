import { HttpRequest, HttpResponse } from '@/interfaces/contracts'
import { internalServerError } from '@/interfaces/presentations'

export abstract class Controller {
  abstract perform (httpRequest: HttpRequest): Promise<HttpResponse>

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      return await this.perform(httpRequest)
    } catch (error) {
      return internalServerError(error)
    }
  }
}
