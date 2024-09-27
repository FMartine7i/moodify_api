require('dotenv').config()
const express = require('express')
const SpotifyWebApi = require('spotify-web-api-node')
const cors = require('cors')
const songsRouter = require('../routes/songs')
const artistRouter = require('../routes/artists')

class server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT || 3000 // el puerto se obtiene del .env

    this.spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET
    })

    this.middlewares()
    // autenticar spotify
    this.authSpotify()
    // definir rutas
    this.routes()
  }

  middlewares () {
    this.app.use(cors())
    this.app.use(express.json())
  }

  authSpotify () {
    this.spotifyApi.clientCredentialsGrant().then(
      (data) => {
        console.log('Token de acceso de Spotify obtenido correctamente')
        this.spotifyApi.setAccessToken(data.body.access_token)
        // Compartir la instancia de Spotify con toda la app
        this.app.locals.spotifyApi = this.spotifyApi
      },
      (err) => {
        console.error('Error al obtener el token de acceso de Spotify', err)
      }
    )
  }

  routes () {
    this.app.use('/api/v1/songs', songsRouter)
    this.app.use('/api/v1/artists', artistRouter)
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto ${this.port}`)
    })
  }
}

module.exports = server
