const { Router } = require('express')
const { getSongs, getSongsByMood, getSongsByGenre } = require('../controllers/songs')
const router = Router()

router.get('/', getSongs)
router.get('/mood/:mood', getSongsByMood)
router.get('/genre/:genre', getSongsByGenre)

module.exports = router
