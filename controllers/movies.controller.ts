import { NextFunction, Request, Response } from 'express'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { Actor } from '../models/actor.model'
import { Movie } from '../models/movie.model'
import { ActorInMovie } from '../models/actorInMovie.model'

import { AppError } from '../util/appError'
import { catchAsync } from '../util/catchAsync'
import { storage } from '../util/firebase'

export const getAllMovie = catchAsync(async (_req: Request, res: Response) => {
  const movies = await Movie.findAll({
    where: { status: 'active' },
    include: [{ model: Actor }]
  })

  res.status(200).json({ status: 'success', data: { movies } })
})

export const getMovieById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    const movie = await Movie.findOne({ where: { id, status: 'active' } })

    if (movie == null) {
      return next(new AppError(400, 'Movie not found'))
    }

    res.status(200).json({ status: 'success', data: { movie } })
  }
)

export const createNewMovie = catchAsync(
  async (req: Request, res: Response) => {
    const { title, description, duration, rating, genre, actors } = req.body

    const { originalname, buffer } = req.file as Express.Multer.File

    const imgRef = ref(
      storage,
      `imgs/movies/${Date.now()}-${Math.floor(Math.random() * 9)}-${
        originalname
      }`
    )

    const result = await uploadBytes(imgRef, buffer)

    const imgURL = await getDownloadURL(ref(storage, result.metadata.fullPath))

    const newMovie: any = await Movie.create({
      title,
      description,
      duration,
      rating,
      img: imgURL,
      genre
    })

    const promise = actors.map(async (actorId: number) => {
      return await ActorInMovie.create({ actorId, movieId: newMovie.id })
    })

    await Promise.all(promise)

    res.status(201).json({ status: 'success', data: { newMovie } })
  }
)

export const updateMovie = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { title, description, duration, genre } = req.body

    const movie = await Movie.findOne({ where: { id, status: 'active' } })

    if (movie == null) {
      return next(new AppError(400, 'Movie not found'))
    }

    await movie.update({ title, description, duration, genre })

    res.sendStatus(204)
  }
)

export const deleteMovie = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    const movie = await Movie.findOne({ where: { id, status: 'active' } })

    if (movie == null) {
      return next(new AppError(400, 'Movie not found'))
    }

    await movie.update({ status: 'disable' })

    res.sendStatus(204)
  }
)
