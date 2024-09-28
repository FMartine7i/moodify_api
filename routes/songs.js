const { Router } = require('express')
const { getSongs, getSongsById, getSongsByMood } = require('../controllers/songs')
const router = Router()

router.get('/', (req, res) => {
  if (req.query.mood) getSongsByMood(req, res)
  else getSongs(req, res)
})
router.get('/:id', getSongsById)

module.exports = router
