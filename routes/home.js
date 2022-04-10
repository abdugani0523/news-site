const { get } = require('../controllers/home')
const router = require('express').Router();

router.get('/', get)

module.exports = router