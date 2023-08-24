import { routeAdapter } from '@/infrastructure/adapters'
import { makeAddUserController } from '@/infrastructure/factories/interfaces'
import { Router } from 'express'

export default (router: Router): void => {
  /**
   * @openapi
   * tags:
   *   - name: User
   *     description: User
   */

  /**
   * @openapi
   * definitions:
   *   Login:
   *     properties:
   *       username:
   *         type: string
   *       password:
   *         type: string
   *       path:
   *         type: string
   */

  /**
   * @openapi
   * /users:
   *   post:
   *     tags: [User]
   *     produces:
   *       - application/json
   *     description: Endpoint para criar usuario!
   *     parameters:
   *       - name: password
   *         description: User's password.
   *         required: true
   *         type: string
   *       - name: name
   *         description: User's password.
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: login
   *         schema:
   *           type: object
   *           $ref: '#/definitions/Login'
   */
  router.post('/users', routeAdapter(makeAddUserController()))
}
