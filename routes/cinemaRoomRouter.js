import {Router} from 'express'

export const cinemaRoomRouter = () => {
  const router = Router()

  const cinemaRoomController = {} //new CinemaRoomController()

  // Ver asientos disponibles, probablemente quite este end-point
  router.get('/:movieId', cinemaRoomController)

  // Admins, falta aplicar los middlewares
  router.post('/', cinemaRoomController)
  router.put('/:id', cinemaRoomController)
  router.delete('/:id', cinemaRoomController)
}
