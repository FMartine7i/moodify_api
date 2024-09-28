const { Router } = require('express')
const { getRecentRockAlbums, getMovieSoundtracks, getInstrumentalAlbums } = require('../controllers/albums')

const router = Router()

router.get('/recent-rock', getRecentRockAlbums)
router.get('/movie-soundtracks', getMovieSoundtracks)
router.get('/instrumental', getInstrumentalAlbums)

module.exports = router
