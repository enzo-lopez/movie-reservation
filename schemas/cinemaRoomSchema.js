import mongoose from 'mongoose'

const seatSchema = new mongoose.Schema({
  row: {type: String, required: true},
  numberSeat: {type: Number, required: true},
  isAvaible: {type: Boolean, default: true},
})

const cinemaRoomSchema = new mongoose.Schema({
  movie: {type: mongoose.Schema.Types.ObjectId, ref: 'movies', required: true},
  date: {type: Date, required: true},
  time: {type: String, required: true},
  seats: {type: [seatSchema], required: true}, // Lista de asientos
})


export const generateSeats = () => {
  const rows = ['A', 'B', 'C']
  const seats = []
  rows.forEach(row => {
    for(let numberSeat = 1; numberSeat <= 8; numberSeat++) {
      seats.push({row, numberSeat, isAvaible: true})
    }
  })
  return seats
}

export const CinemaRoom = mongoose.model('cinemaRoom', cinemaRoomSchema)
