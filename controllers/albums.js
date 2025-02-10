let cachedAlbums = [];

// get albums
const getAlbums = async (req, res) => {
  try {
    const spotifyApi = req.app.locals.spotifyApi;
    
    // lista de palabras claves para obtener albumes variados
    const randomQueries = ["pop", "jazz", "hip-hop", "classical", "blues", "edm", "latin", "indie", "soul", "country"];
    const randomIndex = Math.floor(Math.random() * randomQueries.length);
    const randomQuery = randomQueries[randomIndex];  //elige una palabra aleatoria

    //realiza la busqueda con la palabra clave aleatoria
    const data = await spotifyApi.searchAlbums(req.query.q || randomQuery, { limit: 50 });

    const albums = data.body.albums.items.map((album, index) => ({
      customId: index + 1,
      name: album.name ?? "Sin título",
      artists: album.artists.length > 0 ? album.artists.map(artist => artist.name) : ["Desconocido"],
      release_date: album.release_date ?? "Desconocido",
      total_tracks: album.total_tracks ?? 0,
      image: (album.images.length > 0 && album.images[0].url) ? album.images[0].url : "https://via.placeholder.com/100",
      id: album.id ?? "Desconocido"
    }));

    cachedAlbums = albums;
    res.status(200).json({
      status: 'OK',
      data: cachedAlbums
    });
  } catch (err) {
    console.error('Error al obtener álbumes: ', err);
    res.status(500).json({
      status: 'ERROR',
      message: 'Error al obtener álbumes'
    });
  }
};


// get album by ID
const getAlbumById = async (req, res) => {
  const albumId = req.params.id; 
  console.log("ID recibido en la API:", albumId); 

  const album = cachedAlbums.find(a => a.id === albumId); //buscar por id de Spotify
  if (album) {
    res.status(200).json({
      status: 'OK',
      data: album
    });
  } else {
    console.log("Álbum no encontrado");
    res.status(404).json({
      status: 'ERROR',
      message: 'Álbum no encontrado'
    });
  }
};


// get albums by year
const getAlbumsByYear = async (req, res) => {
  const { year } = req.query;
  if (!year || isNaN(year)) {
    return res.status(400).json({
      status: 'ERROR',
      message: 'Año inválido o no proporcionado'
    });
  }
  try {
    const spotifyApi = req.app.locals.spotifyApi;
    const data = await spotifyApi.searchAlbums(`year:${year}`, { limit: 50 });
    const albums = data.body.albums.items.map(album => ({
      name: album.name,
      artists: album.artists.map(artist => artist.name),
      release_date: album.release_date,
      total_tracks: album.total_tracks,
      image: album.images.length > 0 ? album.images[0].url : "https://via.placeholder.com/100"
    }));
    res.status(200).json({
      status: 'OK',
      data: albums
    });
  } catch (err) {
    console.error('Error al obtener álbumes por año: ', err);
    res.status(500).json({
      status: 'ERROR',
      message: 'Error al obtener álbumes'
    });
  }
};

// get albums by genre
const getAlbumsByGenre = async (req, res) => {
  const { genre } = req.query;
  if (!genre) {
    return res.status(400).json({
      status: 'ERROR',
      message: 'Género no proporcionado'
    });
  }
  try {
    const spotifyApi = req.app.locals.spotifyApi;
    const data = await spotifyApi.searchAlbums(genre, { limit: 50 });
    const albums = data.body.albums.items.map(album => ({
      name: album.name,
      artists: album.artists.map(artist => artist.name),
      release_date: album.release_date,
      total_tracks: album.total_tracks,
      image: album.images.length > 0 ? album.images[0].url : "https://via.placeholder.com/100"
    }));
    res.status(200).json({
      status: 'OK',
      data: albums
    });
  } catch (err) {
    console.error('Error al obtener álbumes por género: ', err);
    res.status(500).json({
      status: 'ERROR',
      message: 'Error al obtener álbumes'
    });
  }
};

module.exports = {
  getAlbums,
  getAlbumById,
  getAlbumsByYear,
  getAlbumsByGenre
};