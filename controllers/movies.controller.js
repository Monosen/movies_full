const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

const { Movie } = require('../models/movie.model');

const { AppError } = require('../util/appError');
const { catchAsync } = require('../util/catchAsync');
const { storage } = require('../util/firebase');

exports.getAllMovie = catchAsync(async (req, res, next) => {
  const movies = await Movie.findAll({ where: { status: 'active' } });

  res.status(200).json({ status: 'success', data: { movies } });
});

exports.getMovieById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findOne({ where: { id, status: 'active' } });

  if (!movie) {
    return next(new AppError(400, 'Movie not found'));
  }

  res.status(200).json({ status: 'success', data: { movie } });
});

exports.createNewMovie = catchAsync(async (req, res, next) => {
  const { title, description, duration, rating, genre } = req.body;

  if (!title || !description || !duration || !rating || !genre) {
    return next(new AppError(400, 'Movie not found'));
  }

  const imgRef = ref(
    storage,
    `imgs/${Date.now()}-${Math.floor(Math.random() * 9)}-${
      req.file.originalname
    }`
  );

  const result = await uploadBytes(imgRef, req.file.buffer);

  const imgURL = await getDownloadURL(ref(storage, result.metadata.fullPath));

  const newMovie = await Movie.create({
    title,
    description,
    duration,
    rating,
    img: imgURL,
    genre
  });

  res.status(201).json({ status: 'success', data: { newMovie } });
});

exports.updateMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title, description, duration, genre } = req.body;

  const movie = await Movie.findOne({ where: { id, status: 'active' } });

  if (!movie) {
    return next(new AppError(400, 'Movie not found'));
  }

  await movie.update({ title, description, duration, genre });

  res.status(204).send();
});

exports.deleteMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findOne({ where: { id, status: 'active' } });

  if (!movie) {
    return next(new AppError(400, 'Movie not found'));
  }

  await movie.update({ status: 'disable' });

  res.status(204).send();
});

/* match /{allPaths=**} {
      allow read, write: if
          request.time < timestamp.date(2022, 4, 20);
    } */
