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

    res.status(200).json({
      status: 'OK',
      data: albums
    })
  } catch (err) {
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
    })
  }
}

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

    res.status(200).json({
      status: 'OK',
      data: albums
    })
  } catch (err) {
    console.error('Error al obtener álbumes instrumentales: ', err)
    res.status(500).json({
      status: 'ERROR',
      message: 'Error al obtener álbumes instrumentales'
    })
  }
}

module.exports = {
  getRecentRockAlbums,
  getMovieSoundtracks,
  getInstrumentalAlbums
}
