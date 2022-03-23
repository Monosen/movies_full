const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { promisify } = require('util');

const { AppError } = require('../util/appError');
const { User } = require('../models/user.model');

const { catchAsync } = require('../util/catchAsync');

dotenv.config({ path: './.env' });

exports.validateSession = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('401', 'Invalid session'));
  }

  const { id } = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findOne({
    where: { id, status: 'active' },
    attributes: {
      exclude: ['password']
    }
  });

  if (!user) {
    return next(new AppError(401, 'Invalid session'));
  }

  req.currentUser = user;

  next();
});
