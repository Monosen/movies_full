const bcrypt = require('bcryptjs');

const { User } = require('../models/user.model');

const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

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

  if (!username || !email || !password) {
    return next(
      new AppError(400, 'Must provide a valid name, email and password')
    );
  }

  const selt = await bcrypt.genSalt(13);

  const hashedPassword = await bcrypt.hash(password, selt);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    role: role || 'standard'
  });

  newUser.password = undefined;

  res.status(201).json({
    status: 'success',
    data: { newUser }
  });
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

  res.status(204).send();
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

  res.status(204).send();
});
