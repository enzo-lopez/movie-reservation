import {Router} from 'express'
import { authenticateToken } from '../middlewares/authenticateToken'
import { isAdmin } from '../middlewares/isAdmin'

export const cinemaRoomRouter = () => {
  const router = Router()

  const cinemaRoomController = {} //new CinemaRoomController()

  // Ver asientos disponibles, probablemente quite este end-point
  router.get('/:movieId', cinemaRoomController)

  // Admins, faltan las funciones del controlador<<<                                                                                <tr5d <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< <<                                                 
  router.post('/', authenticateToken, isAdmin, cinemaRoomController)
  router.put('/:id', authenticateToken, isAdmin, cinemaRoomController)
  router.delete('/:id', authenticateToken, isAdmin, cinemaRoomController)
}

