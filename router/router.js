const router = require('express').Router()
const multer = require('multer')
const fs = require('fs')
const conversion = require('../controller/controller')
const maxSize = 1200000
//multer storage

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Upload')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

//multer upload

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log('file: ', file)
    if (file.mimetype == 'image/png' || file.mimetype == 'image/tiff') {
      cb(null, true)
    } else {
      cb(null, false)
      return new Error('only png or tiff file allowed')
    }
  },
  limits: { fileSize: maxSize }
})

router.post('/convertToPNG', upload.single('path'), conversion.convertFile)
router.post('/pngToblob', upload.single('path'), conversion.pngToBlob)

module.exports = router
