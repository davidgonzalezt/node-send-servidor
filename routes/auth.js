const express = require('express');
const router = express.Router()
const userController = require('../controllers/authControllers');
const { check } = require("express-validator")

const authMiddleware = require("../middleware/authMiddleware")

router.post('/',
  userController.authenticateUser
);

router.get('/',
  authMiddleware,[
  check('email', 'Invalid email').isEmail(),
  check('password', 'password can not be empty').not().isEmpty(),
],
userController.authenticatedUser
);

module.exports = router;