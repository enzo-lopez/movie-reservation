import {
  // TitleReservation,
  UserReservation,
} from '../schemas/reservationSchema.js'

// id Pelicula: 673a45fcc477dbf8de2e04cd
// userReservation tambien lleva date y time por parametro

export class ReservationModel {
  static async createUserReservation({input}) {
    try {
      const newUserReservation = new UserReservation({...input})
      await newUserReservation.save()

      return newUserReservation
    } catch (error) {
      return {error: 'Error al crear reserva de entradas :('}
    }
  }
}
