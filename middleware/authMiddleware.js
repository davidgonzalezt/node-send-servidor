const jwt = require("jsonwebtoken")
require("dotenv").config({
  path: "variables.js"
})

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization')

  if (authHeader) {

    // get token
    const token = authHeader.split(" ")[1]

    // verify jwt
    try {
      const user = jwt.verify(token, process.env.SECRET)
      req.user = user

    } catch (error) {
      console.log(error)
      console.log("JWT no valido")
    }
  }

  return next()
}