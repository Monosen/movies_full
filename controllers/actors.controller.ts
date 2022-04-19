import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { Actor } from '../models/actor.model'

import { catchAsync } from '../util/catchAsync'
import { AppError } from '../util/appError'
import { storage } from '../util/firebase'
import { NextFunction, Request, Response } from 'express'

export const getAllActor = catchAsync(async (_req: Request, res: Response) => {
  const actors = await Actor.findAll({
    where: { status: 'active' },
    attributes: { exclude: ['password'] }
  })

  res.status(200).json({ status: 'success', data: { actors } })
})

export const getActorById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    const actor = await Actor.findOne({ where: { id, status: 'active' } })

    if (actor == null) {
      return next(new AppError(400, 'Actor not fount'))
    }

    res.status(200).json({ status: 'success', data: { actor } })
  }
)

export const createNewActor = catchAsync(
  async (req: Request, res: Response) => {
    const { name, country, rating, age } = req.body

    const { originalname, buffer } = req.file as Express.Multer.File

    const imgRef = ref(
      storage,
      `imgs/actors/${Date.now()}-${Math.floor(Math.random() * 9)}-${originalname}`
    )
    console.log(typeof req.file?.buffer)

    const result = await uploadBytes(imgRef, buffer)

    const imgURL = await getDownloadURL(ref(storage, result.metadata.fullPath))

    const newActor = await Actor.create({
      name,
      country,
      rating,
      age,
      profilecPic: imgURL
    })

    res.status(201).json({ status: 'success', data: { newActor } })
  }
)

export const updateActor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { name, country, age } = req.body

    const actor = await Actor.findOne({ where: { id, status: 'active' } })

    if (actor == null) {
      return next(new AppError(400, 'not fount actor'))
    }

    await actor.update({ name, country, age })

    res.sendStatus(204)
  }
)

export const deleteActor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    const actor = await Actor.findOne({ where: { id, status: 'active' } })

    if (actor == null) {
      return next(new AppError(400, 'not fount actor'))
    }

    await actor.update({ status: 'disable' })

    res.sendStatus(204)
  }
)
