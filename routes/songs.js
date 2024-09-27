const { Router } = require('express')
const { getSongs, getSongsById, getSongsByMood } = require('../controllers/songs')
const router = Router()

router.get('/', getSongs)
router.get('/:id', getSongsById)
router.get('/mood/:mood', getSongsByMood)

module.exports = router
