import { swagger } from '@/infrastructure/docs'
import { Express } from 'express'
import swaggerUi from 'swagger-ui-express'

export const setupSwagger = (app: Express): void => {
  app.use('/docs', swaggerUi.serve)
  app.get('/docs', swaggerUi.setup(swagger))
}
