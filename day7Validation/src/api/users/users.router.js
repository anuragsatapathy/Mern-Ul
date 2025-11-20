const express = require('express');
const router = express.Router();
const usersController = require('./users.controller');
const checkToken = require('../../middlewares/checkToken');

router.get('/', checkToken, usersController.getProfile); // protected

module.exports = router;
