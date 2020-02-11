const Category = require('./app/models/category')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/oct-notes-app', () => {
    const category = new Category({ name : 'none'})
    category.save() 
        .then(category => {
            console.log(category)
        })
})