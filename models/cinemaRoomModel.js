import { CinemaRoom, generateSeats } from "../schemas/cinemaRoomSchema";

export class CinemaRoomModel{
    static async getCinemaRoom({date, time, movie}){
        try {
            let cinemaRoom = await CinemaRoom.findOne({date, time, movie})

            if(!cinemaRoom){
                cinemaRoom = {
                    movie,
                    date,
                    time,
                    seats: generateSeats()
                }
                return cinemaRoom
            }

            return cinemaRoom

        } catch (error) {
            return {error: 'Error getting de cinema room'}
        }
    }

    static async createCinemaRoom({date, time, movie, seats}){
        try {
            // testear, esta muy beta
            let cinemaRoom = await CinemaRoom.findOne({date, time, movie})

            if(!cinemaRoom){
                cinemaRoom = new CinemaRoom({date, time, movie, seats: generateSeats()})
                if(seats){
                    cinemaRoom.seats= {...seats}
                }
                cinemaRoom.save()
                return cinemaRoom
            }

            if(seats){
                cinemaRoom.seats= {...seats}
            }
            cinemaRoom.save()
            return cinemaRoom
        } catch (error) {
            return {error: 'Error creating the cinema room'}
        }
    }

    static async updateCinemaRoom({input}){
        const {id} = input
        let cinemaRoom = await CinemaRoom.findById(id)
        if(!cinemaRoom){
            return {error: 'Cinema Room not found'}
        }
        cinemaRoom = {...input}
        cinemaRoom.save()
        return cinemaRoom
    }

    static async delete({id}){
        try {
            await CinemaRoom.findOneAndDelete({id})
            return {message: 'CinemaRoom deleted successfuly'}
        } catch (error) {
            return {
                error: 'An error ocurred while delete the cinemaRoom, incorrect ID ?',
              }
        }
    }
}

/*
get -> ver asientos disponibles, si saca entradas se crea la sala
post -> crear sala
put -> modificar sala
delete
*/