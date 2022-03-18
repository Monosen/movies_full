const express = require('express');

const {
  getAllUser,
  getUserByID,
  createNewUser,
  updateUser,
  deleteUser
} = require('../controllers/users.controller');

const router = express.Router();

router.all('/').get(getAllUser).post(createNewUser);

router.all('/:id').get(getUserByID).patch(updateUser).delete(deleteUser);

module.exports = { usersRouter: router };
