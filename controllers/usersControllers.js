const User = require('../models/USERS')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator');

exports.newUser = async (req, res) => {
  // show error message from express validator
  const errores = validationResult(req)

  if (!errores.isEmpty()) {
    res.status(400).json({errores: errores.array()})
  }

  // verify if user exist
  const { email, password } = req.body
  try {
  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({msg: 'El usuario ya esta registrado'})
  } 
    // create user
    user = new User(req.body)

    // hashear password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt)

    
      //save user
      await user.save()
      res.json({msg: 'Usuario Creado Correctamente'})
    } catch (error) {
      console.log(error)
    }

}