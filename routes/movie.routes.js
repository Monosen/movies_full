const express = require('express');

const {
  getAllMovie,
  getMovieById,
  createNewMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movies.controller');

const { upload } = require('../util/multer');

const router = express.Router();

router
  .route('/')
  .get(getAllMovie)
  .post(upload.single('movieImg'), createNewMovie);

router.route('/:id').get(getMovieById).patch(updateMovie).delete(deleteMovie);

module.exports = { moviesRouter: router };
