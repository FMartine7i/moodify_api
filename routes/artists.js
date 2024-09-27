const {Router} = require('express');
const { getArtists, getArtistById, getArtistByGenre } = require('../controllers/artists');
const router = Router();

router.get('/artists', getArtists);
router.get('/artists/:id', getArtistById);
router.get('/artists/genre', getArtistByGenre); 

module.exports = router;