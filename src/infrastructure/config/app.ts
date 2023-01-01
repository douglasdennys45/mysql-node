import { setupMiddlewares } from '@/infrastructure/config/middleware'
import express from 'express'

const app = express()

setupMiddlewares(app)
