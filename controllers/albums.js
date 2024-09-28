<<<<<<< HEAD
const getRecentRockAlbums = async (req, res) => {
  try {
    const spotifyApi = req.app.locals.spotifyApi

    const data = await spotifyApi.searchAlbums('genre:rock year:2024', { limit: 50 })

    const albums = data.body.albums.items.map(album => ({
      id: album.id,
      name: album.name,
      release_date: album.release_date,
      total_tracks: album.total_tracks,
      images: album.images,
      artists: album.artists.map(artist => artist.name)
    }))

=======
let cachedAlbums = [] 

// get albums 
const getAlbums = async (req, res) => {
  try {
    const spotifyApi = req.app.locals.spotifyApi
    const data = await spotifyApi.searchAlbums(req.query.q || 'default', { limit: 50 })
    const albums = data.body.albums.items.map((album, index) => ({
      customId: index + 1,
      name: album.name,
      artists: album.artists.map(artist => artist.name),
      release_date: album.release_date,
      total_tracks: album.total_tracks,
      image: album.images[0] && album.images[0].url,
      id: album.id
    }))
    cachedAlbums = albums 
    res.status(200).json({
      status: 'OK',
      data: cachedAlbums
    })
  } catch (err) {
    console.error('Error al obtener álbumes: ', err)
    res.status(500).json({
      status: 'ERROR',
      message: 'Error al obtener álbumes'
    })
  }
}

// get album by id 
const getAlbumById = async (req, res) => {
  const albumId = parseInt(req.params.id)
  const album = cachedAlbums.find(a => a.customId === albumId)
  if (album) {
    res.status(200).json({
      status: 'OK',
      data: album
    })
  } else {
    res.status(404).json({
      status: 'ERROR',
      message: 'Álbum no encontrado'
    })
  }
}

// get albums by year (2024)
const getAlbumsByYear = async (req, res) => {
  try {
    const spotifyApi = req.app.locals.spotifyApi
    const data = await spotifyApi.searchAlbums('year:2024', { limit: 50 })
    const albums = data.body.albums.items.map(album => ({
      name: album.name,
      artists: album.artists.map(artist => artist.name),
      release_date: album.release_date,
      total_tracks: album.total_tracks,
      image: album.images[0] && album.images[0].url
    }))
>>>>>>> mila_branch
    res.status(200).json({
      status: 'OK',
      data: albums
    })
  } catch (err) {
<<<<<<< HEAD
    console.error('Error al obtener álbumes de rock recientes: ', err)
    res.status(500).json({
      status: 'ERROR',
      message: 'Error al obtener álbumes de rock recientes'
    })
  }
}

const getMovieSoundtracks = async (req, res) => {
  try {
    const spotifyApi = req.app.locals.spotifyApi

    const data = await spotifyApi.searchAlbums('soundtrack', { limit: 50 })

    const albums = data.body.albums.items.map(album => ({
      id: album.id,
      name: album.name,
      release_date: album.release_date,
      total_tracks: album.total_tracks,
      images: album.images,
      artists: album.artists.map(artist => artist.name)
    }))

    res.status(200).json({
      status: 'OK',
      data: albums
    })
  } catch (err) {
    console.error('Error al obtener bandas sonoras: ', err)
    res.status(500).json({
      status: 'ERROR',
      message: 'Error al obtener bandas sonoras'
=======
    console.error('Error al obtener álbumes por año: ', err)
    res.status(500).json({
      status: 'ERROR',
      message: 'Error al obtener álbumes'
>>>>>>> mila_branch
    })
  }
}

<<<<<<< HEAD
const getInstrumentalAlbums = async (req, res) => {
  try {
    const spotifyApi = req.app.locals.spotifyApi

    const data = await spotifyApi.searchAlbums('instrumental', { limit: 50 })

    const albums = data.body.albums.items.map(album => ({
      id: album.id,
      name: album.name,
      release_date: album.release_date,
      total_tracks: album.total_tracks,
      images: album.images,
      artists: album.artists.map(artist => artist.name)
    }))

=======
// get instrumental albums
const getInstrumentalAlbums = async (req, res) => {
  try {
    const spotifyApi = req.app.locals.spotifyApi
    const data = await spotifyApi.searchAlbums('instrumental', { limit: 50 })
    const albums = data.body.albums.items.map(album => ({
      name: album.name,
      artists: album.artists.map(artist => artist.name),
      release_date: album.release_date,
      total_tracks: album.total_tracks,
      image: album.images[0] && album.images[0].url
    }))
>>>>>>> mila_branch
    res.status(200).json({
      status: 'OK',
      data: albums
    })
  } catch (err) {
    console.error('Error al obtener álbumes instrumentales: ', err)
    res.status(500).json({
      status: 'ERROR',
<<<<<<< HEAD
      message: 'Error al obtener álbumes instrumentales'
=======
      message: 'Error al obtener álbumes'
>>>>>>> mila_branch
    })
  }
}

module.exports = {
<<<<<<< HEAD
  getRecentRockAlbums,
  getMovieSoundtracks,
=======
  getAlbums,
  getAlbumById,
  getAlbumsByYear,
>>>>>>> mila_branch
  getInstrumentalAlbums
}
