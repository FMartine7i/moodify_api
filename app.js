require('dotenv').config()
const server = require('./models/server')

const app = new server()

app.listen()
