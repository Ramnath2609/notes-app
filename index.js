const express = require('express')
const setupDB = require('./config/database')
const router = require('./config/routes')
const cors = require('cors')
const app = express()
app.use(express.json())
setupDB()
app.use(express.static('public/uploads'))

const port = 3015



app.use(cors())


app.use('/', router )


app.listen(port, () => {
    console.log('listening to port', port)
})
