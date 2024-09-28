const { Router } = require('express');
const { getAlbums } = require('../controllers/albums');
const router = Router();

router.get('/', getAlbums);

module.exports = router;
