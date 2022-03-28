const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { User } = require('../models/user.model');

const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

dotenv.config({ path: './.env' });

exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: { status: 'active' },
    attributes: { exclude: ['password'] }
  });

  res.status(200).json({ status: 'success', data: { users } });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id, status: 'active' },
    attributes: { exclude: ['password'] }
  });

  if (!user) {
    return next(new AppError(400, 'User not found'));
  }

  res.status(200).json({ status: 'success', data: { user } });
});

exports.createNewUser = catchAsync(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  const selt = await bcrypt.genSalt(13);

  const hashedPassword = await bcrypt.hash(password, selt);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    role
  });

  newUser.password = undefined;

  res.status(201).json({
    status: 'success',
    data: { newUser }
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email, status: 'active' } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError(400, 'Credentials are invalid'));
  }

  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.status(200).json({ status: 'success', data: { token } });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { username, email } = req.body;

  const user = await User.findOne({
    where: { id, status: 'active' },
    attributes: { exclude: ['password'] }
  });

  if (!user) {
    return next(new AppError(400, 'User not found'));
  }

  await user.update({ username, email });

  res.sendStatus(204);
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id, status: 'active' }
  });

  if (!user) {
    return next(new AppError(400, 'User not found'));
  }

  await user.update({ status: 'disable' });

  res.sendStatus(204);
});
