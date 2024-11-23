import {Router} from 'express'
import {ReservationController} from '../controller/reservationController.js'

export const reservationRouter = () => {
  const router = Router()

  const reservationController = new ReservationController()

  router.post('/', reservationController.createUserReservation)
  router.get('/')

  // Admin
  router.get('/all')
  router.delete('/:id')

  return router
}
