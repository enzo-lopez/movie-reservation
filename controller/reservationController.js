import {ReservationModel} from '../models/reservationModel.js'
import {User} from '../schemas/userSchema.js'

// user: "6740f0f8ef89434c7e3031eb",
// movie: "673a45fcc477dbf8de2e04cd",
/*
const reservation = {
  user: '6740f0f8ef89434c7e3031eb',
  movie: '673a45fcc477dbf8de2e04cd',
  date: new Date('2024-11-22'),
  time: '20:00',
  choosenSeats: [
    {row: 'A', numberSeat: 1, isAvaible: false},
    {row: 'B', numberSeat: 2, isAvaible: false},
    {row: 'C', numberSeat: 3, isAvaible: false},
  ],
}
*/

export class ReservationController {
  constructor() {
    this.ReservationModel = ReservationModel
  }

  createUserReservation = async (req, res) => {
    const {userId, movie, date, time, choosenSeats} = req.body
    const reservation = {
      user: userId,
      movie,
      date,
      time,
      choosenSeats,
    }
    const newUserReservation =
      await this.ReservationModel.createUserReservation({reservation})

    if (newUserReservation.error) {
      return res.status(500).json(newUserReservation.error)
    }

    // Si el guardado de la reserva fue exitoso
    // Agregamos la reserva a la lista de reservas del user
    const user = await User.findOne({_id: reservation.user})
    user.reservation.push(newUserReservation._id)
    await user.save()

    res.status(201).json({
      message: 'Reserva hecha correctamente',
      reserva: await newUserReservation.populate('movie'),
    })
  }

  getUserReservations = async (req, res) => {
    //falta testear
    const userId = req.user

    const userReservations = await this.ReservationModel.getUserReservations({
      userId,
    })
    return res.status(201).json({user: userId, reservations: userReservations})
  }

  getAllReservations = async (req, res) => {
    const allRervations = await this.ReservationModel.getAllReservations()
    return res.status(201).json({Reservations: allRervations})
  }

  delete = async (req, res) => {
    const userId = req.user
    const result = await this.ReservationModel.delete({userId})
    if (result.error) {
      return res.status(400).json({error: result.error})
    }
    return res.json({message: result.message})
  }
}
