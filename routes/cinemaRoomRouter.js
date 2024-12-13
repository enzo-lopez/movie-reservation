import {Router} from 'express'
import {authenticateToken} from '../middlewares/authenticateToken.js'
import {isAdmin} from '../middlewares/isAdmin.js'
import {CinemaRoomController} from '../controller/cinemaRoomController.js'

export const cinemaRoomRouter = () => {
  const router = Router()

  const cinemaRoomController = new CinemaRoomController()

  // Busca una sala, si no existe se devuelve una sala temporal
  // Donde el usuario seleccionara los asientos, y llamara a router.post
  router.get('/:movieId', cinemaRoomController.getCinemaRoom)

  // Recibe una sala con asientos. Si no existe, se creara una nueva
  // Si ya existe, actualiza los asientos ocupados
  router.post(
    '/',
    authenticateToken,
    isAdmin,
    cinemaRoomController.createOrUpdateCinemaRoom
  )

  // Admins
  router.patch(
    '/:id',
    authenticateToken,
    isAdmin,
    cinemaRoomController.updateCinemaRoom
  )
  router.delete(
    '/:id',
    authenticateToken,
    isAdmin,
    cinemaRoomController.deleteCinemaRoom
  )
  return router
}
