const express = require('express');

const {
  getAllUser,
  getUserById,
  createNewUser,
  loginUser,
  updateUser,
  deleteUser
} = require('../controllers/users.controller');

const { validateSession } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/login', loginUser);

router.post(createNewUser);

router.use(validateSession);

router.route('/').get(getAllUser);

router.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser);

module.exports = { usersRouter: router };
