const express = require('express');
const router = express.Router()
const linksController = require('../controllers/linksController');
const { check } = require("express-validator")
const authMiddleware = require("../middleware/authMiddleware")
const filesController = require('../controllers/filesController')

router.post('/', 
[
  check('name', 'Sube un Archivo').not().isEmpty(),
  check('original_name', 'Sube un Archivo').not().isEmpty()
],
  authMiddleware, 
  linksController.newLink
)

router.get('/',
  linksController.allLinks,
);

router.get('/:url',
  linksController.getFile,
  filesController.deleteFile
);

module.exports = router;