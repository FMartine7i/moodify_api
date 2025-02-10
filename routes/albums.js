const express = require('express');
const { getAlbums, getAlbumById, getAlbumsByYear, getAlbumsByGenre } = require('../controllers/albums');

const router = express.Router();

router.get('/', getAlbums);
router.get('/:id', getAlbumById);
router.get('/year/:year', getAlbumsByYear);
router.get('/genre/:genre', getAlbumsByGenre);

module.exports = router;
