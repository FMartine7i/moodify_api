const getPlaylists = async (req, res) => {
    try {
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

const moods = {
    estudiar: ['focus', 'study', 'concentration', 'instrumental'],
    limpiar: ['cleaning', 'upbeat', 'energetic', 'feel-good'],
    celebrar: ['celebration', 'party', 'festive', 'dance'],
    sinAnimos: ['chill', 'calm', 'melancholy', 'downtempo'],
    bailar: ['dance', 'groove', 'electronic', 'club', 'pop'],
};

const getPlaylistByMood = async (req, res) => {
    const mood = req.params.mood;
    const clave = moods[mood] || ['pop'];
    try {

        const searchQuery = clave.join(' ');
        const spotify = req.app.locals.spotifyApi;
        const data = await spotify.searchPlaylists(searchQuery, { limit: 10 });

        const moodPlaylists = data.body.playlists.items.map(playlist => ({
            playlistId: playlist.id,
            nombre: playlist.name,
            descripcion: playlist.description,
            imagenUrl: playlist.images[0]?.url,
            enlaceSpotify: playlist.external_urls.spotify,
        }));
        res.status(200).json({
            estado: 'éxito',
            playlists: moodPlaylists,
        });
    } catch (error) {
        console.error(`Error buscando playlists para el mood: ${mood}`, error);
        res.status(500).json({
            estado: 'error',
            mensaje: `No se pudieron obtener playlists para el estado de ánimo ${mood}`,
        });
    }
};


module.exports = {
    getPlaylists,
    getPlaylistByMood
};