import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { User } from '../models/user.model'

import { catchAsync } from '../util/catchAsync'
import { AppError } from '../util/appError'
import { NextFunction, Request, Response } from 'express'

dotenv.config({ path: './.env' })

export const getAllUser = catchAsync(async (_req: Request, res: Response) => {
  const users = await User.findAll({
    where: { status: 'active' },
    attributes: { exclude: ['password'] }
  })

  res.status(200).json({ status: 'success', data: { users } })
})

export const getUserById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    const user = await User.findOne({
      where: { id, status: 'active' },
      attributes: { exclude: ['password'] }
    })

    if (user == null) {
      return next(new AppError(400, 'User not found'))
    }

    res.status(200).json({ status: 'success', data: { user } })
  }
)

export const createNewUser = catchAsync(async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body

  const selt = await bcrypt.genSalt(13)

  const hashedPassword = await bcrypt.hash(password, selt)

  const newUser: any = await User.create({
    username,
    email,
    password: hashedPassword,
    role
  })

  newUser.password = undefined

  res.status(201).json({
    status: 'success',
    data: { newUser }
  })
})

export const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    const user: any = await User.findOne({ where: { email, status: 'active' } })

    if ((user == null) || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError(400, 'Credentials are invalid'))
    }

    const token = await jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
    )

    res.status(200).json({ status: 'success', data: { token } })
  }
)

export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { username, email } = req.body

    const user = await User.findOne({
      where: { id, status: 'active' },
      attributes: { exclude: ['password'] }
    })

    if (user == null) {
      return next(new AppError(400, 'User not found'))
    }

    await user.update({ username, email })

    res.sendStatus(204)
  }
)

export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    const user = await User.findOne({
      where: { id, status: 'active' }
    })

    if (user == null) {
      return next(new AppError(400, 'User not found'))
    }

    await user.update({ status: 'disable' })

    res.sendStatus(204)
  }
)
