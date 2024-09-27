let cachedPlaylists = [];
const getPlaylists = async (req, res) => {
    try {
        const spotifyApi = req.app.locals.spotifyApi;
        const data = await spotifyApi.searchPlaylists(req.query.q || 'default', { limit: 50 });
        const playlists = data.body.playlists.items.map((playlist, index) => ({
            id: index + 1,
            nombre: playlist.name,
            imagen: playlist.images,
            enlaceSpotify: playlist.external_urls.spotify
        }));

        cachedPlaylists = playlists;

        res.status(200).json({
            status: 'OK',
            data: cachedPlaylists,
        });
    } catch (err) {
        console.log('Error al obtener playlists: ', err);
        res.status(500).json({
            status: 'ERROR',
            message: 'Error al obtener playslist',
        });
    }
};

const getPlaylistById = async (req, res) => {
    const playlistId = parseInt(req.params.id);
    const playlist = cachedPlaylists.find(s => s.id === playlistId);
    if(playlist) {
        res.status(200).json({
            status: 'OK',
            data: playlist
        });
    } else{
        res.status(404).json({
            status: 'ERROR',
            message: 'Error al obtener la playlist'
        });
    }
}

const momentoDelDia = {
    mañana: ['morning motivation', 'happy morning', 'acoustic wake up', 'energizing morning'],
    tarde: ['afternoon focus', 'study vibes', 'productive work', 'afternoon boost'],
    noche: ['evening relaxation', 'chill night', 'sleep calm', 'calm night'],
    madrugada: ['late night energy', 'night workout', 'night party vibes', 'deep night focus'],
};
  
  const getPlaylistsByTimeOfDay = async (req, res) => {
    const { moment } = req.params;
    const playlistsQuery = momentoDelDia[moment?.toLowerCase()] || ['party'];
  
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
    getPlaylistById,
    getPlaylistsByTimeOfDay
};