const express = require('express')
const setupDB = require('./config/database')
const router = require('./config/routes')
const cors = require('cors')




const app = express()
const port = 3015

app.use(express.json())
setupDB()

//app.use(express.static('./uploads'))


app.use(cors())


app.use('/', router )

// app.get('/', (req, res) => {
//     //res.send('welcome to the website')
//     res.json({
//         notice:'welcome to the website'
//     })
// })

app.listen(port, () => {
    console.log('listening to port', port)
})
