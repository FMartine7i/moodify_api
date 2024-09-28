const getAlbums = async (req, res) => {
  try {
    const spotifyApi = req.app.locals.spotifyApi;

    const query = req.query.q || 'default';  // Búsqueda por defecto o por el término que el usuario proporcione
    const year = req.query.year ? ` year:${req.query.year}` : '';  // Filtra por año si está presente

    const isRock2024 = query.includes('genre:rock') && req.query.year === '2024';
    const limit = isRock2024 ? 50 : 10;

    const data = await spotifyApi.searchAlbums(`${query}${year}`, { limit });

    // Mapea los datos de los álbumes
    const albums = data.body.albums.items.map(album => ({
      id: album.id,
      name: album.name,
      release_date: album.release_date,
      total_tracks: album.total_tracks,
      images: album.images,
      artists: album.artists.map(artist => artist.name),
    }));

    // Respuesta en formato JSON
    res.status(200).json({
      status: 'OK',
      data: albums,
    });
  } catch (err) {
    console.error('Error al obtener álbumes: ', err);
    res.status(500).json({
      status: 'ERROR',
      message: 'Error al obtener álbumes',
    });
  }
};

module.exports = {
  getAlbums,
};
