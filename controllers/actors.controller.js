const { Actor } = require('../models/actor.model');

const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

exports.getAllActor = catchAsync(async (req, res, next) => {
  const actors = await Actor.findAll({
    where: { status: 'active' },
    attributes: { exclude: ['password'] }
  });

  res.status(200).json({ status: 'success', data: { actors } });
});

exports.getActorById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const actor = await Actor.findOne({ where: { id } });

  if (!actor) {
    return next(new AppError(400, 'Actor not fount'));
  }

  res.status(200).json({ status: 'success', data: { actor } });
});

exports.createNewActor = catchAsync(async (req, res, next) => {
  const { name, country, rating, age, profilecPic } = req.body;

  if (!name || !country || !rating || !age || !profilecPic) {
    return next(new AppError(400, 'error create actor'));
  }

  const newActor = await Actor.create({
    name,
    country,
    rating,
    age,
    profilecPic
  });

  res.status(201).json({ status: 'success', data: { newActor } });
});

exports.updateActor = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, country, age } = req.body;

  const actor = await Actor.findOne({ where: { id, status: 'active' } });

  if (!actor) {
    return next(new AppError(400, 'not fount actor'));
  }

  await actor.update({ name, country, age });

  res.status(204).send();
});

exports.deleteActor = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const actor = await Actor.findOne({ where: { id, status: 'active' } });

  if (!actor) {
    return next(new AppError(400, 'not fount actor'));
  }

  await actor.update({ status: 'disable' });

  res.status(204).send();
});
