import express from 'express'

import {
  getAllMovie,
  getMovieById,
  createNewMovie,
  updateMovie,
  deleteMovie
} from '../controllers/movies.controller'

import { validateSession, protectAdmin } from '../middlewares/auth.middleware'
import {
  validateResult,
  createMovieValidations
} from '../middlewares/validators.middleware'

import { upload } from '../util/multer'

const router = express.Router()

router.use(validateSession)

router
  .route('/')
  .get(getAllMovie)
  .post(
    protectAdmin,
    upload.single('img'),
    createMovieValidations,
    validateResult,
    createNewMovie
  )

router
  .route('/:id')
  .get(getMovieById)
  .patch(protectAdmin, updateMovie)
  .delete(protectAdmin, deleteMovie)

export { router as moviesRouter }
