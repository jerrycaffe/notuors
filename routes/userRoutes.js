const express = require('express');
const {getUsers, getUser, createUser, updateUser, deleteUser} = require('../controllers/userController');
const userRoutes = express.Router();


userRoutes.route('/').get(getUsers).post(createUser);
userRoutes.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = userRoutes;