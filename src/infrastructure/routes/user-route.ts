import { routeAdapter } from '@/infrastructure/adapters'
import { makeAddUserController } from '@/infrastructure/factories/interfaces'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/users', routeAdapter(makeAddUserController()))
}
