import { AddUser } from '@/domain/contracts'
import { HttpRequest, HttpResponse } from '@/interfaces/contracts'
import { ok } from '@/interfaces/presentations'
import { Controller } from './controller'

export class AddUserController extends Controller {
  constructor (private readonly useCases: AddUser) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse> {
    const response = await this.useCases.perform(httpRequest.body)
    return ok(response)
  }
}
