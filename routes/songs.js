const { Router } = require('express')
const { getSongs } = require('../controllers/songs')
const routes = Router()

routes.get('/songs', getSongs)

module.exports = routes
