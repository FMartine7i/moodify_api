// ------------------------------------------ get songs ------------------------------------------
const getSongs = async (req, res) => {
  try {
    const spotifyApi = req.app.locals.spotifyApi
    const data = await spotifyApi.searchTracks(req.query.q || 'default', { limit: 10 })
    const songs = data.body.tracks.items.map(song => ({
      id: song.id,
      name: song.name,
      artists: song.artists.map(artist => artist.name),
      album: song.album.name,
      preview_url: song.preview_url,
      image: song.album.images[0] && song.album.images[0].url
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

// ------------------------------------------ get songs by mood ------------------------------------------
// mapear los nombres de los estados de ánimo a palabras clave de búsqueda
const moodToKeywords = {
  relaxed: ['chill', 'acoustic', 'relax', 'ambient'],
  happy: ['happy', 'upbeat', 'joyful', 'energetic'],
  sad: ['melancholy', 'sad', 'emotional', 'slow'],
  angry: ['angry', 'aggressive', 'intense', 'intense'],
  dark: ['dark', 'gloomy', 'somber', 'depressing'],
  romantic: ['romantic', 'love', 'sweet', 'passionate'],
  creepy: ['creepy', 'spooky', 'weird', 'unsettling', 'eerie', 'mysterious'],
  emotional: ['emotional', 'heartfelt', 'expressive', 'soulful']
}

const getSongsByMood = async (req, res) => {
  const { mood } = req.params
  const keywords = moodToKeywords[mood] || ['popular'] // en caso de no encontrar el estado de ánimo, se busca popular
  try {
    const spotifyApi = req.app.locals.spotifyApi
    const query = keywords.join(' ')
    const data = await spotifyApi.searchTracks(query, { limit: 10 })
    const songs = data.body.tracks.items.map(song => ({
      id: song.id,
      name: song.name,
      artists: song.artists.map(artist => artist.name),
      album: song.album.name,
      preview_url: song.preview_url,
      image: song.album.images[0] && song.album.images[0].url
    }))
    res.status(200).json({
      status: 'OK',
      data: songs
    })
  } catch (err) {
    console.error('Error al obtener canciones por estado de ánimo: ', err)
    res.status(500).json({
      status: 'ERROR',
      message: 'Error al obtener canciones'
    })
  }
}

// ------------------------------------------ get songs by genre ------------------------------------------
const getSongsByGenre = async (req, res) => {
  const { genre } = req.params
  try {
    const spotifyApi = req.app.locals.spotifyApi
    const data = await spotifyApi.searchTracks(`genre:${genre}`, { limit: 10 })

    const songs = data.body.tracks.items.map(song => ({
      id: song.id,
      name: song.name,
      artists: song.artists && Array.isArray(song.artists) ? song.artists.map(artist => artist.name) : ['Unknown artist'],
      album: song.album.name,
      preview_url: song.preview_url,
      image: song.album.images[0] && song.album.images[0].url
    }))
    res.status(200).json({
      status: 'OK',
      data: songs
    })
  } catch (err) {
    console.error('Error al obtener canciones por género: ', err)
    res.status(500).json({
      status: 'ERROR',
      message: 'Error al obtener canciones'
    })
  }
}

module.exports = {
  getSongs,
  getSongsByMood,
  getSongsByGenre
}
