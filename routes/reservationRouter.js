import {Router} from 'express'
import {ReservationController} from '../controller/reservationController.js'
import { authenticateToken } from '../middlewares/authenticateToken.js'
import { isAdmin } from '../middlewares/isAdmin.js'

export const reservationRouter = () => {
  const router = Router()

  const reservationController = new ReservationController()

  router.post('/', reservationController.createUserReservation)
  // falta testear
  router.get('/', reservationController.getUserReservations)

  // Admin, falta testear
  router.get('/all', authenticateToken, isAdmin, reservationController.getAllReservations)
  router.delete('/:id', authenticateToken, isAdmin, reservationController.delete)

  return router
}
