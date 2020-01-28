const mongoose = require('mongoose')


//Schema
const Schema = mongoose.Schema
const noteSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    createdAt : {
        type : Date,
        default : new Date()
    },
    category : {
        type : Schema.Types.ObjectId,
        required : true,
        ref:'Category'
    },
    photo : {
        type :String
    }
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note