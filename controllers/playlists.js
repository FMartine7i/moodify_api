let cachedPlaylists = []

const getPlaylists = async (req, res) => {
  try {
    const spotifyApi = req.app.locals.spotifyApi
    if (!spotifyApi) throw new Error('Spotify API no está configurada')

    const data = await spotifyApi.searchPlaylists(req.query.q || 'music', { limit: 50 })
    const playlists = data.body.playlists.items
      .filter(playlist => playlist !== null)
      .map((playlist, index) => ({
        customId: index + 1,
        nombre: playlist.name,
        imagen: playlist.images.length > 0 ? playlist.images[0].url : null,
        enlaceSpotify: playlist.external_urls.spotify
      }))

    cachedPlaylists = playlists

    res.status(200).json({
      status: 'OK',
      data: cachedPlaylists
    })
  } catch (err) {
    console.log('Error al obtener playlists: ', err)
    res.status(500).json({
      status: 'ERROR',
      message: 'Error al obtener playlists'
    })
  }
}

const getPlaylistById = async (req, res) => {
  const playlistId = parseInt(req.params.id)
  const playlist = cachedPlaylists.find(s => s.customId === playlistId)

  if (playlist) {
    res.status(200).json({
      status: 'OK',
      data: playlist
    })
  } else {
    res.status(404).json({
      status: 'ERROR',
      message: 'Playlist no encontrada'
    })
  }
}

const momentoDelDia = {
  mañana: ['morning motivation', 'happy morning', 'acoustic wake up', 'energizing morning'],
  tarde: ['afternoon focus', 'study vibes', 'productive work', 'afternoon boost'],
  noche: ['evening relaxation', 'chill night', 'sleep calm', 'calm night'],
  madrugada: ['late night energy', 'night workout', 'night party vibes', 'deep night focus']
}

const getPlaylistsByTimeOfDay = async (req, res) => {
  const queryMoment = req.params.moment ? req.params.moment.toLowerCase() : 'party'
  const playlistsQuery = momentoDelDia[queryMoment] || ['party']

  try {
    const spotify = req.app.locals.spotifyApi
    if (!spotify) throw new Error('Spotify API no está configurada')

    const query = playlistsQuery.join(' ')
    const searchResult = await spotify.searchPlaylists(query, { limit: 10 })

    const playlists = searchResult.body.playlists.items.map(item => ({
      id: item.id,
      nombre: item.name,
      imagen: item.images.length > 0 ? item.images[0].url : null,
      enlaceSpotify: item.external_urls.spotify
    }))

    res.status(200).json({
      estado: 'OK',
      data: playlists
    })
  } catch (err) {
    console.log('Error buscando playlists por momento del día: ', err)
    res.status(500).json({
      estado: 'ERROR',
      message: 'Error al buscar playlists por momento del día'
    })
  }
}

module.exports = {
  getPlaylists,
  getPlaylistById,
  getPlaylistsByTimeOfDay
}
