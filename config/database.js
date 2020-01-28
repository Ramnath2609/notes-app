const mongoose = require('mongoose')


// mongo db connect
const setupDB = () => {
    mongoose.connect('mongodb://localhost:27017/oct-notes-app',{ useNewUrlParser: true , useUnifiedTopology: true })
    .then(() => {
        console.log('connected to db')
    })
    .catch(err => {
        console.log(err)
    })
}


module.exports = setupDB