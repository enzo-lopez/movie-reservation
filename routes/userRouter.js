import {Router} from 'express'
import {UserController} from '../controller/userController.js'

export const userRouter = () => {
  const router = Router()

  const userController = new UserController()

  router.post('/login')
  router.post('/register', userController.register)

  return router
}
