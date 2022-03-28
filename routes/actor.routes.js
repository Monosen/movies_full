const express = require('express');

const {
  getAllActor,
  getActorById,
  createNewActor,
  updateActor,
  deleteActor
} = require('../controllers/actors.controller');

const {
  validateSession,
  protectAdmin
} = require('../middlewares/auth.middleware');
const {
  createActorValidations,
  validateResult
} = require('../middlewares/validators.middleware');

const { upload } = require('../util/multer');

const router = express.Router();

router.use(validateSession);

router
  .route('/')
  .get(getAllActor)
  .post(
    protectAdmin,
    upload.single('img'),
    createActorValidations,
    validateResult,
    createNewActor
  );

router
  .route('/:id')
  .get(getActorById)
  .patch(protectAdmin, updateActor)
  .delete(protectAdmin, deleteActor);

module.exports = { actorsRouter: router };
