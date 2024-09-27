const { Router } = require('express')
const { getArtists, getArtistById, getArtistByGenre } = require('../controllers/artists')
const router = Router()

router.get('/', getArtists)
router.get('/:id', getArtistById)
router.get('/genre/:genre', getArtistByGenre)

module.exports = router
