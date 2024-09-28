const { Router } = require('express')
<<<<<<< HEAD
const { getRecentRockAlbums, getMovieSoundtracks, getInstrumentalAlbums } = require('../controllers/albums')

const router = Router()

router.get('/recent-rock', getRecentRockAlbums)
router.get('/movie-soundtracks', getMovieSoundtracks)
router.get('/instrumental', getInstrumentalAlbums)
=======
const { getAlbums, getAlbumById, getAlbumsByYear, getInstrumentalAlbums } = require('../controllers/albums')
const router = Router()

router.get('/', (req, res) => {
    if (req.query.year) {
        getAlbumsByYear(req, res)
    } else if (req.query.instrumental) {
        getInstrumentalAlbums(req, res)
    } else {
        getAlbums(req, res)
    }
})

router.get('/:id', getAlbumById)
>>>>>>> mila_branch

module.exports = router
