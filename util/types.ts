import { Request } from 'express'
import { Model } from 'sequelize/types'

interface Props {
  id?: number
  user?: string
  email?: string
  role?: string
  status?: string
}

export type RequestWithUser = Request & {
  currentUser: Model & Props
}
