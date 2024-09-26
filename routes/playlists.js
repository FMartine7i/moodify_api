const { Router } = require('express');
const { getPlaylists, getPlaylistByMood } = require('../controllers/playlists');
const router = Router();

router.get('/', getPlaylists);
router.get('/:mood', getPlaylistByMood);

module.exports = router;