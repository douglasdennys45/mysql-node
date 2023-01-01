import { HttpResponse } from '@/interfaces/contracts'

export const internalServerError = (error: any): HttpResponse => ({
  statusCode: 500,
  error: {
    title: error.name,
    detail: error.message
  }
})
