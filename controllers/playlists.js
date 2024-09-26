const getPlaylists = async (req, res) => {
    try {
        const spotifyApi = req.app.locals.spotifyApi;
        const data = await spotifyApi.searchPlaylists(req.query.q || 'default', { limit: 50 });
        const playlists = data.body.playlists.items.map(playlist => ({
            id: playlist.id,
            nombre: playlist.name,
            imagen: playlist.images,
            enlaceSpotify: playlist.external_urls.spotify
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
        const data = await spotify.searchPlaylists(searchQuery, { limit: 1 });

        const moodPlaylists = data.body.playlists.items.map(playlist => ({
            id: playlist.id,
            nombre: playlist.name,
            imagen: playlist.images[0]?.url,
            enlaceSpotify: playlist.external_urls.spotify,
        }));
        res.status(200).json({
            estado: 'OK',
            data: moodPlaylists,
        });
    } catch (err) {
        console.log(`Error buscando playlists para el mood: ${mood}`, err);
        res.status(500).json({
            estado: 'ERROR',
            message: `No se pudieron obtener playlists para el estado de ánimo ${mood}`,
        });
    }
};

const momentoDelDia = {
    morning: ['morning motivation', 'happy morning', 'acoustic wake up', 'energizing morning'],
    tarde: ['afternoon focus', 'study vibes', 'productive work', 'afternoon boost'],
    noche: ['evening relaxation', 'chill night', 'sleep calm', 'calm night'],
    madrugada: ['late night energy', 'night workout', 'night party vibes', 'deep night focus'],
};
  
  const getPlaylistsByTimeOfDay = async (req, res) => {
    const { time } = req.query;
    const playlistsQuery = momentoDelDia[time?.toLowerCase()] || ['party'];
  
    try {
      const spotify = req.app.locals.spotifyApi;
      const query = playlistsQuery.join(' ');
      const searchResult = await spotify.searchPlaylists(query, { limit: 10 });
  
      const playlists = searchResult.body.playlists.items.map(item => ({
        id: item.id,
        nombre: item.name,
        imagen: item.images[0]?.url,
        enlaceSpotify: item.external_urls.spotify,
      }));
  
      res.status(200).json({
        estado: 'OK',
        data: playlists,
      });
    } catch (err) {
      console.log('Error buscando playlists por idioma: ', err);
      res.status(500).json({
        estado: 'ERROR',
        message: 'Error al buscar playlists por idioma',
      });
    }
  };
  


module.exports = {
    getPlaylists,
    getPlaylistByMood,
    getPlaylistsByTimeOfDay
};