import {CinemaRoom, generateSeats} from '../schemas/cinemaRoomSchema.js'

export class CinemaRoomModel {
  static async getCinemaRoom({date, time, movie}) {
    try {
      let cinemaRoom = await CinemaRoom.findOne({date, time, movie})

      if (!cinemaRoom) {
        // Se genera un cine temporal, con asientos vacios
        cinemaRoom = {
          movie,
          date,
          time,
          seats: generateSeats(),
        }
        return cinemaRoom
      }

      return cinemaRoom
    } catch (error) {
      return {error: 'Error getting de cinema room'}
    }
  }

  static async createOrUpdateCinemaRoom({date, time, movie, seats}) {
    try {
      const filter = {date, time, movie}
      const update = {$setOnInsert: {seats: generateSeats()}}

      if (seats) {
        // Sobrescribe los asientos si son proporcionados
        update.$set = {seats: {...seats}}
      }

      // Upsert (actualizar si ya existe, insertar si no existe)
      const options = {upsert: true, new: true}

      const cinemaRoom = await CinemaRoom.findByIdAndUpdate(
        filter,
        update,
        options
      )

      return cinemaRoom
    } catch (error) {
      console.error(error)
      return {error: 'Error creating or updating the cinema room'}
    }
  }

  static async updateCinemaRoom({userId, updates}) {
    try {
      const cinemaRoom = await CinemaRoom.findById(userId)
      if (!cinemaRoom) {
        return {error: 'Cinema Room not found'}
      }
      Object.assign(cinemaRoom, ...updates)
      cinemaRoom.save()
      return cinemaRoom
    } catch (error) {
      return {error: 'An error ocurred while updating the cinema room'}
    }
  }

  static async delete({userId}) {
    try {
      await CinemaRoom.findOneAndDelete({userId})
      return {message: 'CinemaRoom deleted successfuly'}
    } catch (error) {
      return {
        error: 'An error ocurred while delete the cinemaRoom, incorrect ID ?',
      }
    }
  }
}
