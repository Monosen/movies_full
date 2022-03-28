const { body, validationResult } = require('express-validator');
const { AppError } = require('../util/appError');

exports.createActorValidations = [
  body('name')
    .isString()
    .withMessage('Country must be a string')
    .notEmpty()
    .withMessage('Must provide a valid name'),
  body('country')
    .isString()
    .withMessage('Country must be a string')
    .notEmpty()
    .withMessage('Must provide a valid country name'),
  body('rating')
    .isNumeric()
    .withMessage('Rating must be a number')
    .custom((value) => value > 0 && value <= 5)
    .withMessage('Rating must be between 1 and 5'),
  body('age')
    .isNumeric()
    .withMessage('Age must be a number')
    .custom((value) => value > 0)
    .withMessage('Age must be greater than 0')
];

exports.createMovieValidations = [
  body('title')
    .isString()
    .withMessage('Title must be a string')
    .notEmpty()
    .withMessage('Must provide a valid title'),
  body('description')
    .isString()
    .withMessage('Description must be a string')
    .notEmpty()
    .withMessage('Must provide a valid description'),
  body('duration')
    .isNumeric()
    .withMessage('Duration must be a number')
    .custom((value) => value > 0)
    .withMessage('Duration must be greater than 0'),
  body('rating')
    .isNumeric()
    .withMessage('Rating must be a number')
    .custom((value) => value > 0 && value <= 5)
    .withMessage('Rating must be between 1 and 5'),
  body('genre')
    .isString()
    .withMessage('Genre must be a string')
    .notEmpty()
    .withMessage('Must provide a valid genre'),
  body('actors')
    .isArray({ min: 1 })
    .withMessage('Must provide at least one actor id')
];

exports.createUserValidations = [
  body('username').isString().notEmpty().withMessage('Enter a valid name'),
  body('email').isEmail().notEmpty().withMessage('Enter a valid email'),
  body('password')
    .isAlphanumeric()
    .withMessage(`Password must include letters and numbers`)
    .isLength({ min: 8, max: 50 })
    .withMessage('Password must be 8 characters long')
];

exports.createReviewValidations = [
  body('title')
    .isString()
    .withMessage('Title must be a string')
    .notEmpty()
    .withMessage('Must provide a valid title'),
  body('comment')
    .isString()
    .withMessage('Comment must be a string')
    .notEmpty()
    .withMessage('Must provide a valid comment'),
  body('rating')
    .isNumeric()
    .withMessage('Rating must be a number')
    .custom((value) => value > 0 && value <= 5)
    .withMessage('Rating must be between 1 and 5')
];

exports.validateResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const message = errors
      .array()
      .map(({ msg }) => msg)
      .join('. ');

    return next(new AppError(400, message));
  }

  next();
};
