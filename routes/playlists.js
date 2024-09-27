const { Router } = require('express');
const { getPlaylists, getPlaylistById, getPlaylistsByTimeOfDay } = require('../controllers/playlists');
const router = Router();

router.get('/moment/:moment', getPlaylistsByTimeOfDay);
router.get('/:id', getPlaylistById);
router.get('/', getPlaylists);

module.exports = router;