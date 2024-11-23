import express from 'express'
import mongo from './config/mongo.js'
import {movieRouter} from './routes/movieRouter.js'
import {userRouter} from './routes/userRouter.js'
import {reservationRouter} from './routes/reservationRouter.js'

const app = express()
mongo.connectToMongo

app.use(express.json())

app.use('/users', userRouter())
app.use('/movies', movieRouter())
app.use('/reservation', reservationRouter())
// app.use('cinema-rooms')

const PORT = 3000

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}/`)
})
