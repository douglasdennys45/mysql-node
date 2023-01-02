import { HttpResponse } from '@/interfaces/contracts'

export const ok = (body: any): HttpResponse => ({
  statusCode: 200,
  body
})

export const internalServerError = (error: any): HttpResponse => ({
  statusCode: 500,
  error: {
    title: error.name,
    detail: error.message
  }
})
