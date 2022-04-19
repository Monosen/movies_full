import express from 'express'

import {
  getAllActor,
  getActorById,
  createNewActor,
  updateActor,
  deleteActor
} from '../controllers/actors.controller'

import { validateSession, protectAdmin } from '../middlewares/auth.middleware'
import {
  createActorValidations,
  validateResult
} from '../middlewares/validators.middleware'

import { upload } from '../util/multer'

const router = express.Router()

router.use(validateSession)

router
  .route('/')
  .get(getAllActor)
  .post(
    protectAdmin,
    upload.single('img'),
    createActorValidations,
    validateResult,
    createNewActor
  )

router
  .route('/:id')
  .get(getActorById)
  .patch(protectAdmin, updateActor)
  .delete(protectAdmin, deleteActor)

export { router as actorsRouter }
