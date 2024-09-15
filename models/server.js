require('dotenv').config();
const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');

class server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000; // el puerto se obtiene del .env

        this.spotifyApi = new SpotifyWebApi({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        });

        // autenticarse 
        this.authSpotify();

        this.routes();
    }

    authSpotify() {
        this.spotifyApi.clientCredentialsGrant().then(
            (data) => {
                console.log('Token de acceso de Spotify obtenido correctamente');
                this.spotifyApi.setAccessToken(data.body['access_token']);
            },
            (err) => {
                console.error('Error al obtener el token de acceso de Spotify', err);
            }
        );
    }

    routes() {
        // endpoint de álbumes de películas
        this.app.get('/api/v1/albums/movies', async (req, res) => {
            try {
                const data = await this.spotifyApi.searchAlbums('soundtrack', { limit: 50 });
                const albums = data.body.albums.items.map(album => ({
                    id: album.id,
                    name: album.name,
                    release_date: album.release_date,
                    total_tracks: album.total_tracks,
                    images: album.images,
                    artists: album.artists.map(artist => artist.name),
                }));

                res.status(200).json({
                    status: 'ok',
                    data: albums
                });
            } catch (error) {
                console.error('Error al obtener álbumes:', error);
                res.status(500).json({
                    status: 'error',
                    msg: 'Error inesperado al obtener los álbumes'
                });
            }
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }
}

module.exports = server;
