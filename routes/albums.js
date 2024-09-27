const { Router } = require('express');
const { getRecentRockAlbums, getMovieSoundtracks, getInstrumentalAlbums } = require('../controllers/album');

const router = Router();

router.get('/albums/recent-rock', getRecentRockAlbums);
router.get('/albums/movie-soundtracks', getMovieSoundtracks);
router.get('/albums/instrumental', getInstrumentalAlbums);

module.exports = router;
