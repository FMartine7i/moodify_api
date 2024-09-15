const { Router } = require('express')
const { getSongs } = require('../controllers/songs')
const router = Router()

router.get('/', getSongs)

module.exports = router
