import { CinemaRoomModel } from "../models/cinemaRoomModel";

export class CinemaRoomController{
    controller(){
        this.CinemaRoomModel = CinemaRoomModel
    }

    getCinemaRoom = async (req, res) => {
        const {date, time, movie} = req.body
        const cinemaRoom = await this.CinemaRoomModel.getCinemaRoom({date, time, movie})
        if(cinemaRoom.error){
            return res.status(401).json({error: cinemaRoom.error})
        }
        res.status(201).json({cinemaRoom: cinemaRoom})
    }

    /*
    get -> ver asientos disponibles, si saca entradas se crea la sala
    post -> crear sala
    put -> modificar sala
    delete
*/

}