import express from 'express'
import mongo from './config/mongo.js'
import {movieRouter} from './routes/movieRouter.js'
import {userRouter} from './routes/userRouter.js'
import {reservationRouter} from './routes/reservationRouter.js'
import {cinemaRoomRouter} from './routes/cinemaRoomRouter.js'

const app = express()
mongo.connectToMongo

app.use(express.json())

app.use('/user', userRouter())
app.use('/movie', movieRouter())
app.use('/reservation', reservationRouter())
app.use('/cinema-room', cinemaRoomRouter())

const PORT = 3000

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}/`)
})
