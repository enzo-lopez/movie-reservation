import {CinemaRoomModel} from '../models/cinemaRoomModel.js'

export class CinemaRoomController {
  controller() {
    this.CinemaRoomModel = CinemaRoomModel
  }

  getCinemaRoom = async (req, res) => {
    const {date, time, movie} = req.body
    const cinemaRoom = await this.CinemaRoomModel.getCinemaRoom({
      date,
      time,
      movie,
    })
    if (cinemaRoom.error) {
      return res.status(401).json({error: cinemaRoom.error})
    }
    res.status(201).json({cinemaRoom: cinemaRoom})
  }
  // Aca falta, en caso de que llegue un id
  // llamar a create user reservation
  createOrUpdateCinemaRoom = async (req, res) => {
    const {date, time, movie, seats} = req.body
    const cinemaRoom = await this.CinemaRoomModel.createOrUpdateCinemaRoom({
      date,
      time,
      movie,
      seats,
    })
    if (cinemaRoom.error) {
      return res.status(401).json({error: cinemaRoom.error})
    }
    res.status(201).json({cinemaRoom: cinemaRoom})
  }

  updateCinemaRoom = async (req, res) => {
    const userId = req.params.id
    const cinemaRoom = await this.CinemaRoomModel.updateCinemaRoom({
      userId,
      updates: req.body,
    })
    if (cinemaRoom.error) {
      return res.status(404).json({error: cinemaRoom.error})
    }
    res.status(201).json({cinemaRoom: cinemaRoom})
  }

  deleteCinemaRoom = async (req, res) => {
    const userId = req.params.id
    const result = await this.CinemaRoomModel.delete({userId})
    if (result.error) {
      return res.status(404).json({error: result.error})
    }
    res.status(200).json(result.message)
  }
}
