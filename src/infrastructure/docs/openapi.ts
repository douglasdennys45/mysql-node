import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Open API',
      version: '1.0.0'
    }
  },
  apis: ['../**/*.ts', '../routes/*.js']
}

export const swagger = swaggerJsdoc(options)
