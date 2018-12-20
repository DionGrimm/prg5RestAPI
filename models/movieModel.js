const mongoose = require('mongoose')
const Schema = mongoose.Schema

let movieModel = new Schema({
    title: {
        type: String
    },
    director: {
        type: String
    },
    starring: {
        type: String, default: "Tom Cruise"
    },
    year: {
        type: String
    },
})

module.exports = mongoose.model('movie', movieModel)