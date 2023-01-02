import { HttpRequest } from '@/interfaces/contracts'
import { Controller } from '@/interfaces/controllers'
import { Request, Response } from 'express'

export const routeAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers
    }
    const { statusCode, body, error } = await controller.handle(httpRequest)
    const json = [200, 299].includes(statusCode) ? { data: body } : { error }
    return res.status(statusCode).json(json)
  }
}
