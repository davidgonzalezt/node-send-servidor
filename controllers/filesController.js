const multer = require("multer");
const shortid = require('shortid');
const Link = require("../models/LINKS")
const fs = require('fs')


// upload files
exports.uploadNewFile = async (req, res, next) => {
  const configurationMulter = {
    limits : { fileSize: req.user ? 1024 * 1024 * 10 : 1024 * 1024 },
    storage: fileStorage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, __dirname + '/../uploads')
      },
      filename: (req, file, cb) => {
        const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, `${shortid.generate()}${extension}`)
      },
    })
  }
  
  const upload = multer(configurationMulter).single('file');
  
  upload(req, res, async error => {
    console.log(req.file);

    if(!error) {    
      res.json({ file: req.file.filename })

    } else {
      console.log(error);
      return  next();
    }
  });
  
}

exports.deleteFile = async (req, res, next) => {
  try {
    fs.unlinkSync(__dirname + `/../uploads/${req.file}`)
    console.log('archivo eliminado')
  } catch (error) {
    console.log(error)
  }
}

exports.download = async(req, res, next) => {
  const linkDb =  await Link.findOne({ name: req.params.file })
  const filePath = __dirname + '/../uploads/' + req.params.file

  if(!linkDb) {
    res.status(400).json({error: 'No se Encontro el archivo en la base de datos'})
    return
  }

  res.download(filePath, linkDb.original_name)
  // if downloads is 1 - delet from database
  const { downloads, name, url } = linkDb
  if (downloads === 1) {
    // delet file
    req.file = name 
    next()
    //delet document in the DB
    await Link.findOneAndRemove({ url })
    
    // console.log("if only one")
  } else {
    // if downloads > 1 - subtract one to downloads
    linkDb.downloads --;
    await linkDb.save()
  }

  // delete file
}