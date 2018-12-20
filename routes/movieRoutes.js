const express = require('express')

let routes = (Movie) => {
    let movieRouter = express.Router()
    let movieController = require('../controllers/movieController')(Movie)

    movieRouter.options("/*", (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        res.send(200);
      });

    movieRouter.route('/')
        .post(movieController.post)
        .get(movieController.get)

    movieRouter.use('/:movieId', (req, res, next) => {
        Movie.findById(req.params.movieId, (err, movie) => {
            if(err) {
                res.status(500).send(err)
            } 
            else if(movie){
                req.movie = movie
                next()
            } else {
                res.status(404).send('No movies found')
            }
        })
    })

    movieRouter.route('/:movieId')
        .get((req, res) => {
            let returnMovie = req.movie.toJSON()

            returnMovie._links = {
                'self': {},
                'collection': {}
            }

            let selfLink = 'http://' + req.headers.host + '/api/movies/' + returnMovie._id
            returnMovie._links.self = selfLink.replace(' ', '%20')

            let collectionLink = 'http://' + req.headers.host + '/api/movies/'
            returnMovie._links.collection = collectionLink

            res.json(returnMovie)
        })
        .put((req, res) => {
            if (
                req.body.title == ""
            ) {
                res.status(404).send('No empty fields')
            } else {
                req.movie.title = req.body.title
                req.movie.director = req.body.director
                req.movie.starring = req.body.starring
                req.movie.year = req.body.year
                req.movie.save()
                res.json(req.movie)
            }
        })
        .delete((req, res) => {
            req.movie.remove((err) => {
                if(err) {
                    res.status(500).send(err)
                }
                else {
                    res.status(204).send('Removed')
                }
            })
        })
    return movieRouter
}

module.exports = routes