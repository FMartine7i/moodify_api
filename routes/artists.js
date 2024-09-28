const { Router } = require('express')
const { getArtists, getArtistById, getArtistByGenre } = require('../controllers/artists')
const router = Router()


router.get('/', (req, res) => {
    if(req.query.genre){
        return getArtistByGenre(req, res);
    }
    return getArtists(req, res);
});
router.get('/:id', getArtistById);


module.exports = router
