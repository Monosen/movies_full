const express = require('express');

const {
  getAllActor,
  getActorById,
  createNewActor,
  updateActor,
  deleteActor
} = require('../controllers/actors.controller');

const router = express.Router();

router.route('/').get(getAllActor).post(createNewActor);

router.route('/:id').get(getActorById).patch(updateActor).delete(deleteActor);

module.exports = { actorsRouter: router };
