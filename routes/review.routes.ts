import express from 'express'

import {
  getAllReview,
  getReviewById,
  updateReview,
  deleteReview,
  createNewReview
} from '../controllers/review.controller'
import { validateSession } from '../middlewares/auth.middleware'
import {
  createReviewValidations,
  validateResult
} from '../middlewares/validators.middleware'

const router = express.Router()

router.use(validateSession)

router
  .route('/')
  .get(getAllReview)
  .post(createReviewValidations, validateResult, createNewReview)

router
  .route('/:id')
  .get(getReviewById)
  .patch(updateReview)
  .delete(deleteReview)

export { router as ReviewsRouter }
