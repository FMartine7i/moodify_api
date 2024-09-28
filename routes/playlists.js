const { Router } = require('express')
const { getPlaylists, getPlaylistById, getPlaylistsByTimeOfDay } = require('../controllers/playlists')
const router = Router()

router.get('/', (req, res, next) => {
  if (req.query.moment) {
    return getPlaylistsByTimeOfDay(req, res, next)
  }
  return getPlaylists(req, res, next)
})
router.get('/:id', getPlaylistById)

module.exports = router
