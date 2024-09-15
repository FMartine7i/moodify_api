const getSongs = async (req, res) => {
  try {
    const spotifyApi = req.app.locals.spotifyApi
    const data = await spotifyApi.searchTracks(req.query.q || 'default', { limit: 10 })
    const songs = data.body.tracks.items.map(song => ({
      id: song.id,
      name: song.name,
      artists: song.artists.map(artist => artist.name),
      album: song.album.name
    }))
    res.status(200).json({
      status: 'OK',
      data: songs
    })
  } catch (err) {
    console.error('Error al obtener canciones: ', err)
    res.status(500).json({
      status: 'ERROR',
      message: 'Error al obtener canciones'
    })
  }
}

module.exports = {
  getSongs
}
