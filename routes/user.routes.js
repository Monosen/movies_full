const express = require('express');

const {
  getAllUser,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser
} = require('../controllers/users.controller');

const router = express.Router();

router.route('/').get(getAllUser).post(createNewUser);

router.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser);

module.exports = { usersRouter: router };
