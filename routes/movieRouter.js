import {Router} from 'express'
import {MovieController} from '../controller/movieController.js'

export const movieRouter = () => {
  const router = Router()

  const movieController = new MovieController()

  router.get('/', movieController.getAll) // Todas las peliculas
  router.get('/:id', movieController.getById)

  // Admins, falta middlewares
  router.post('/', movieController.create)
  router.put('/:id', movieController.update)
  router.delete('/:id', movieController.delete)

  return router
}
