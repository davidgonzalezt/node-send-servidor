const User = require('../models/USERS')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { validationResult } = require('express-validator');
require("dotenv").config({
  path: "variables.js"
})

exports.authenticateUser = async (req, res, next) => {
  // check errors
  const errores = validationResult(req)

  if (!errores.isEmpty()) {
    res.status(400).json({errores: errores.array()})
    return
  }

  // find the user and verify that he is registered
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    res.status(401).json({msg: 'El usuario no existe'})
    return next();
  }

  // user exist
  if (bcrypt.compareSync(password, user.password)) {
    // create JWT
    const token = jwt.sign({
      nombre: user.name,
      id: user._id
    }, process.env.SECRET, {
      expiresIn: '8h'
    })

    res.json({ token })
  } else {
    res.status(400).json({ msg: 'Invalid Password' })
  }

}

exports.authenticatedUser = async (req, res, next) => {
  res.json({user: req.user})

  return next()
}