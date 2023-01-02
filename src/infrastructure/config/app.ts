import { setupMiddlewares } from '@/infrastructure/config/middleware'
import express from 'express'
import { setupSwagger } from './swagger'

const app = express()

setupMiddlewares(app)
if (process.env.APP_ENV !== null) {
  setupSwagger(app)
}

export { app }
