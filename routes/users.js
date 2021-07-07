const express = require('express');
const router = express.Router()
const userController = require('../controllers/usersControllers');
const { check } = require('express-validator');

router.post('/',[
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Invalid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({min: 6}),
],
  userController.newUser
);

module.exports = router;