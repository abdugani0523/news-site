const express = require('express');
const multer = require('multer');
const { get, post } = require('../controllers/admin')
const checkToken = require('../middlewares/checkToken')
const { storage, fileFilter } = require('../config')
const router = express.Router();
const upload =  multer({ storage: multer.diskStorage(storage), fileFilter })

router.post('/post', express.query(), checkToken, upload.fields([
    {
        name: 'image', maxCount: 1
    },
    {
        name: 'thumbnail', maxCount: 1
    }
]), post)
router.get('/admin', express.query(), checkToken, get)

module.exports = router