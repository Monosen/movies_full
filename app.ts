import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import { usersRouter } from './routes/user.routes'
import { actorsRouter } from './routes/actor.routes'
import { moviesRouter } from './routes/movie.routes'
import { ReviewsRouter } from './routes/review.routes'

import { globalErrorHandler } from './controllers/error.controller'

import { AppError } from './util/appError'

const app = express()

app.use(cors())

app.use(helmet())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
else app.use(morgan('combined'))

app.use('/api/v1/users', usersRouter)
app.use('/api/v1/actors', actorsRouter)
app.use('/api/v1/movies', moviesRouter)
app.use('/api/v1/reviews', ReviewsRouter)

app.use('*', (req, _res, next) => {
  next(new AppError(404, `${req.originalUrl} not found in this server.`))
})

app.use(globalErrorHandler)

export { app }
