const { Router } = require('express');
const { getPlaylists } = require('../controllers/playlists');
const router = Router();

router.get('/', getPlaylists);

module.exports = router;