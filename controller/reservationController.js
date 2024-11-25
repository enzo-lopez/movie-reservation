import {ReservationModel} from '../models/reservationModel.js'
import {User} from '../schemas/userSchema.js'

// user: "6740f0f8ef89434c7e3031eb",
// movie: "673a45fcc477dbf8de2e04cd",

export class ReservationController {
  constructor() {
    this.ReservationModel = ReservationModel
  }

  createUserReservation = async (req, res) => {
    const reservation = {
      user: '6740f0f8ef89434c7e3031eb',
      movie: '673a45fcc477dbf8de2e04cd',
      date: new Date('2024-11-22'),
      time: '19:00',
      choosenSeats: [
        {row: 'C', numberSeat: 1, isAvaible: false},
        {row: 'C', numberSeat: 2, isAvaible: false},
        {row: 'C', numberSeat: 3, isAvaible: false},
      ],
    }

    const newUserReservation =
      await this.ReservationModel.createUserReservation({input: reservation})

    if (newUserReservation.error) {
      return res.status(500).json(newUserReservation.error)
    }

    // Si fue exitosa, tambien la agregamos a la lista de reservas del user
    const user = await User.findOne({_id: reservation.user}) // falta aagregar este a model
    user.reservation.push(newUserReservation._id)
    await user.save()

    res.status(201).json({
      message: 'Reserva hecha correctamente',
      reserva: await newUserReservation.populate('movie'),
    })
  }

  getUserReservations = async (req, res) => { //falta terminar
    const userId = req.user.id

    const userReservations = this.ReservationModel.getUserReservations // falta el await
    res.status(201).json({user: userId, reservations: userReservations})
  }

  getAllReservations = async (req, res) => { //falta await
    const allRervations = this.ReservationModel.getAllReservations
    res.status(201).json({Reservations: allRervations})
  }

  delete = async (req, res) => {
    const {id} = req.params
    const result = await this.ReservationModel.delete({id})
    if(result.error){
      return res.status(400).json({error: result.error})
    }
    res.json({message: result.message})
  }
}
