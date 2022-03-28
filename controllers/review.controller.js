const { catchAsync } = require('../util/catchAsync');

const { Review } = require('../models/review.model');
const { AppError } = require('../util/appError');

exports.getAllReview = catchAsync(async (req, res, next) => {
  const reviews = await Review.findAll({ where: { status: 'active' } });

  res.status(200).json({ status: 'success', data: { reviews } });
});

exports.getReviewById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findOne({ where: { id, status: 'active' } });

  if (!review) {
    return next(new AppError(400, 'Review not fount'));
  }

  res.status(200).json({ status: 'success', data: { review } });
});

exports.createNewReview = catchAsync(async (req, res, next) => {
  const { title, comment, rating, movieId } = req.body;
  const { id } = req.currentUser;

  const review = await Review.create({
    title,
    comment,
    rating,
    userId: id,
    movieId
  });

  res.status(201).json({ status: 'success', data: { review } });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const { title, comment, rating } = req.body;
  const { id } = req.params;
  const { currentUser } = req;

  const review = await Review.findOne({
    where: { id, userId: currentUser.id, status: 'active' }
  });

  if (!review) {
    return next(new AppError(404, 'Review not fount'));
  }

  await review.update({ title, comment, rating });

  res.sendStatus(204);
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { currentUser } = req;

  const review = await Review.findOne({
    where: { id, userId: currentUser.id, status: 'active' }
  });

  if (!review) {
    return next(new AppError(404, 'Review not fount'));
  }

  await review.update({ status: 'disable' });

  res.sendStatus(204);
});
