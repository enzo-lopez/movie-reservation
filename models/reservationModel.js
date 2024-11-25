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

  static async getUserReservations({userId}){
    return await UserReservation.find({user: userId})
  }

  static async getAllReservations(){
    return await UserReservation.find()
  }

  static async delete({id}){
    try {
      const reservation = await UserReservation.findById({id})
      await reservation.deleteOne()
      return {
        message: 'Reservation deleted successfully'
      }
    } catch (error) {
      return {
        error: 'An error ocurred while delete the reservation'
      }
    }
  }
}
