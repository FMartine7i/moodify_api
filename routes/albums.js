const { Router } = require('express')
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

module.exports = router
