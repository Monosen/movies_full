import express from 'express'

import {
  getAllUser,
  getUserById,
  createNewUser,
  loginUser,
  updateUser,
  deleteUser
} from '../controllers/users.controller'

import { validateSession } from '../middlewares/auth.middleware'
import {
  createUserValidations,
  validateResult
} from '../middlewares/validators.middleware'

const router = express.Router()

router.post('/login', loginUser)

router.post('/', createUserValidations, validateResult, createNewUser)

router.use(validateSession)

router.route('/').get(getAllUser)

router.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser)

export { router as usersRouter }
