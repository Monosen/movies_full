import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'
import { AppError } from './appError'

const storage = multer.memoryStorage()

const multerFileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  if (!file.mimetype.startsWith('image')) {
    // Return an error
    cb(new AppError(400, 'Must provide an image as a file'))
  } else {
    cb(null, true)
  }
}

const upload = multer({
  storage,
  fileFilter: multerFileFilter
})

export { upload }
