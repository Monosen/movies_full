const express = require('express');

const {
  getAllActor,
  getActorByID,
  createNewActor,
  updateActor,
  deleteActor
} = require('../controllers/actors.controller');

const router = express.Router();

router.all('/').get(getAllActor).post(createNewActor);

router.all('/:id').get(getActorByID).patch(updateActor).delete(deleteActor);

module.exports = { actorsRouter: router };
