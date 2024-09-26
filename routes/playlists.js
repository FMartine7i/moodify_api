const { Router } = require('express');
const { getPlaylists, getPlaylistByMood, getPlaylistsByTimeOfDay } = require('../controllers/playlists');
const router = Router();

router.get('/', getPlaylists);
router.get('/:mood', getPlaylistByMood);
router.get('/moment', getPlaylistsByTimeOfDay);

module.exports = router;