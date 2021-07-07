const express = require('express');
const router = express.Router()
const filesController = require('../controllers/filesController');
const authMiddleware = require("../middleware/authMiddleware");


router.post('/',
  authMiddleware,
  filesController.uploadNewFile
)

router.delete('/:id',
  filesController.deleteFile
);

module.exports = router;