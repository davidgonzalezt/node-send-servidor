const Link = require("../models/LINKS")
const shortid = require("shortid")
const bcrypt = require("bcrypt")
const { validationResult } = require("express-validator")

exports.newLink = async (req, res, next) => {
  // check errors
  const errores = validationResult(req)

  if (!errores.isEmpty()) {
    res.status(400).json({errores: errores.array()})
    return
  }
  // create link properties
  const { original_name, name } = req.body
  const link = new Link()

  link.url = shortid.generate()
  link.name = name
  link.original_name = original_name

  if (req.user) {
    const { password, downloads } = req.body
    link.password = password

    // assign the number of downloads allowed
    if (downloads) link.downloads = downloads

    // assign password to link
    if (password) {
       
      const salt = await bcrypt.genSalt(10);
      link.password = await bcrypt.hash(password, salt)
    }

    // assign author
    link.author = req.user.id
  }

  try {
    //save into DB
    await link.save()
    return res.json({
      msg : "link saved successfully",
      url: link.url
    })

    next()

  } catch (error) {
    console.log(error)
  }
}

// get links

exports.getFile = async (req, res, next) => {
  const { url } = req.params

  // verify link exist
  const link = await Link.findOne({ url })
  
  if (!link) {
    res.status(404).json({ message: 'no se encontro' })
    return next()
  }

  res.status(200).json({ file: link.name })

  // if downloads is 1 - delet from database
  const { downloads, name } = link
  if (downloads === 1) {
    // delet file
    req.file = name 
    next()
    //delet document in the DB
    await Link.findOneAndRemove({ url })
    
    // console.log("if only one")
  } else {
    // if downloads > 1 - subtract one to downloads
    link.downloads --;
    await link.save()
  }
}
