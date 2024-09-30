// ------------------------------------------ get songs ------------------------------------------
let cachedSongs = [] // creo carpeta para guardar las canciones con id personalizada
const getSongs = async (req, res) => {
  try {
    const spotifyApi = req.app.locals.spotifyApi
    const data = await spotifyApi.searchTracks(req.query.q || 'league', { limit: 50 })
    const songs = data.body.tracks.items.map((song, index) => ({
      customId: index + 1,
      name: song.name,
      artists: song.artists.map(artist => artist.name),
      album: song.album.name,
      preview_url: song.preview_url,
      image: song.album.images[0] && song.album.images[0].url
    }))
    cachedSongs = songs // guardar las canciones en la caché
    res.status(200).json({
      status: 'OK',
      data: cachedSongs
    })
  } catch (err) {
    console.error('Error al obtener canciones: ', err)
    res.status(500).json({
      status: 'ERROR',
      message: 'Error al obtener canciones'
    })
  }
}

// ------------------------------------------ get songs by id ------------------------------------------
const getSongsById = async (req, res) => {
  const songId = parseInt(req.params.id)
  const song = cachedSongs.find(s => s.customId === songId)
  if (song) {
    res.status(200).json({
      status: 'OK',
      data: song
    })
  } else {
    res.status(404).json({
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
  const { mood } = req.query
  const keywords = moodToKeywords[mood] || ['popular'] // en caso de no encontrar el estado de ánimo, se busca popular
  try {
    const spotifyApi = req.app.locals.spotifyApi
    const query = keywords.join(' ')
    const data = await spotifyApi.searchTracks(query, { limit: 50 })
    const songs = data.body.tracks.items.map(song => ({
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

module.exports = {
  getSongs,
  getSongsByMood,
  getSongsById
}
