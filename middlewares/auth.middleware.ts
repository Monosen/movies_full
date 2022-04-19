import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
// import { promisify } from 'util';

import { AppError } from '../util/appError'
import { User } from '../models/user.model'

import { catchAsync } from '../util/catchAsync'
import { NextFunction, Response } from 'express'
import { RequestWithUser } from '../util/types'

dotenv.config({ path: './config.env' })

export const validateSession = catchAsync(
  async (req: RequestWithUser, _res: Response, next: NextFunction) => {
    let token: string | null = null

    if (
      typeof req.headers.authorization === 'string' &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (token === null) {
      return next(new AppError(401, 'Invalid session'))
    }

    interface devcodeRes extends jwt.JwtPayload {
      id?: number
      iat?: number
      exp?: number
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET as string) as devcodeRes
    // const devcode = await promisify(jwt.verify)(token, process.env.JWT_SECRET as any);

    const user = await User.findOne({
      where: { id, status: 'active' },
      attributes: {
        exclude: ['password']
      }
    })

    if (user === null) {
      return next(new AppError(401, 'Invalid session'))
    }

    req.currentUser = user

    next()
  }
)

export const protectAdmin = catchAsync(
  async (req: RequestWithUser, _res: Response, next: NextFunction) => {
    const { role } = req.currentUser

    if (role !== 'admin') {
      return next(new AppError(401, 'Access denied'))
    }

    next()
  }
)
