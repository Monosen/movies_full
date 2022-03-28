const express = require('express');

const {
  getAllMovie,
  getMovieById,
  createNewMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movies.controller');

const {
  validateSession,
  protectAdmin
} = require('../middlewares/auth.middleware');
const {
  validateResult,
  createMovieValidations
} = require('../middlewares/validators.middleware');

const { upload } = require('../util/multer');

const router = express.Router();

router.use(validateSession);

router
  .route('/')
  .get(getAllMovie)
  .post(
    protectAdmin,
    upload.single('img'),
    createMovieValidations,
    validateResult,
    createNewMovie
  );

router
  .route('/:id')
  .get(getMovieById)
  .patch(protectAdmin, updateMovie)
  .delete(protectAdmin, deleteMovie);

module.exports = { moviesRouter: router };
