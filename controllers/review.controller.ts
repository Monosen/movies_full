import { catchAsync } from '../util/catchAsync'

import { Review } from '../models/review.model'
import { AppError } from '../util/appError'
import { NextFunction, Request, Response } from 'express'

import { RequestWithUser } from '../util/types'

export const getAllReview = catchAsync(async (_req: Request, res: Response) => {
  const reviews = await Review.findAll({ where: { status: 'active' } })

  res.status(200).json({ status: 'success', data: { reviews } })
})

export const getReviewById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    const review = await Review.findOne({ where: { id, status: 'active' } })

    if (review == null) {
      return next(new AppError(400, 'Review not fount'))
    }

    res.status(200).json({ status: 'success', data: { review } })
  }
)

export const createNewReview = catchAsync(
  async (req: RequestWithUser, res: Response) => {
    const { title, comment, rating, movieId } = req.body
    const { currentUser } = req

    const review = await Review.create({
      title,
      comment,
      rating,
      userId: currentUser?.id,
      movieId
    })

    res.status(201).json({ status: 'success', data: { review } })
  }
)

export const updateReview = catchAsync(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const { title, comment, rating } = req.body
    const { id } = req.params
    const { currentUser } = req

    const review = await Review.findOne({
      where: { id, userId: currentUser?.id, status: 'active' }
    })

    if (review == null) {
      return next(new AppError(404, 'Review not fount'))
    }

    await review.update({ title, comment, rating })

    res.sendStatus(204)
  }
)

export const deleteReview = catchAsync(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { currentUser } = req

    const review = await Review.findOne({
      where: { id, userId: currentUser?.id, status: 'active' }
    })

    if (review == null) {
      return next(new AppError(404, 'Review not fount'))
    }

    await review.update({ status: 'disable' })

    res.sendStatus(204)
  }
)
