const express = require('express');

const {
  getAllReview,
  getReviewById,
  updateReview,
  deleteReview,
  createNewReview
} = require('../controllers/review.controller');
const { validateSession } = require('../middlewares/auth.middleware');
const {
  createReviewValidations,
  validateResult
} = require('../middlewares/validators.middleware');

const router = express.Router();

router.use(validateSession);

router
  .route('/')
  .get(getAllReview)
  .post(createReviewValidations, validateResult, createNewReview);

router
  .route('/:id')
  .get(getReviewById)
  .patch(updateReview)
  .delete(deleteReview);

module.exports = { ReviewsRouter: router };
