const getPlaylists = async (req, res) => {
    try{
        const spotifyApi = req.app.locals.spotifyApi;
        const data = await spotifyApi.searchPlaylists(req.query.q || 'default', { limit: 50 });
        const playlists = data.body.playlists.items.map(playlist => ({
            id: playlist.id,
            nombre: playlist.name,
            imagen: playlist.images,
        }));

        res.status(200).json({
            status: 'OK',
            data: playlists,
        });
    } catch (err) {
        console.log('Error al obtener playlists: ', err);
        res.status(500).json({
            status: 'ERROR',
            message: 'Error al obtener playslist',
        });
    }
};

module.exports = {
    getPlaylists
};