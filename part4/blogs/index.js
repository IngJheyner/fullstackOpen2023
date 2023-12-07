import config from './utils/config.js'
import app from './app.js'
import http from 'node:http'

const server = http.createServer(app)

server.listen(config.PORT, () => {
    console.log(`Server running on port http://localhost:${config.PORT}`)
})