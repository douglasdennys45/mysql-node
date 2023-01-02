import { setupMiddlewares } from '@/infrastructure/config/middleware'
import express from 'express'
import { setupRoutes } from './routes'
import { setupSwagger } from './swagger'

const app = express()

setupMiddlewares(app)
setupRoutes(app)
if (process.env.APP_ENV !== null) {
  setupSwagger(app)
}

export { app }
