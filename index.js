const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const db = mongoose.connect('mongodb://localhost/movieAPI')

const Movie = require('./models/movieModel')

const app = express()
const port = 8000 //process.env.PORT || 8000

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

let movieRouter = require('./routes/movieRoutes')(Movie)

app.use('/api/movies', movieRouter)

app.get('/', (req, res) => res.send('Movie API!'))

app.listen(port, () => console.log(`API is running on Keta: ${port}!`))