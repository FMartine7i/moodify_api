let cachedArtists = []
const getArtists = async (req, res) => {
    try {
        const spotifyApi = req.app.locals.spotifyApi;
        const data = await spotifyApi.searchArtists(req.query.q || 'default', { limit: 50 });

        const artists = data.body.artists.items.map((artist, index) => ({
            customId: index + 1,
            name: artist.name,
            genres: artist.genres,
            popularity: artist.popularity,
            images: artist.images
        }));
        cachedArtists = artists

        res.status(200).json({
            status: 'OK',
            data: cachedArtists,
        })
    } catch (err) {
        console.log('Error al obtener artistas: ', err);
        res.status(500).json({
            status: 'ERROR',
            message: 'Error al obtener los artistas',
        });
    }
}
const getArtistById = async (req, res) => {


    const artistId = parseInt(req.params.id);

    const artist = cachedArtists.find(artist => artist.customId === artistId);
    if (artist) {
        res.status(200).json({
            status: 'OK',
            data: artist,
        });
    } else {
        res.status(404).json({
            status: 'ERROR',
            message: 'Error al obtener el artista por ID',
        });
    }


}

const getArtistByGenre = async (req, res) =>{
    try{
        const genre = req.params.genre || 'rock';
        if(!genre){
            return res.status(400).json({
                status:'ERROR',
                message: "Debe proporcionar un genero para filtrar",
            });
        }

        const filteredArtists = cachedArtists.filter(artist => artist.genres && artist.genres.includes(genre));

        res.status(200).json({
            status: 'OK',
            data: filteredArtists,
        });
    }catch(err){
        console.log('Error al filtrar artistas por genero: ', err);
        res.status(500).json({
            status: 'ERROR',
            message: 'Error al filtrar artistas por genero',
        });
    }
}

module.exports = {
    getArtists,
    getArtistById,
    getArtistByGenre
}