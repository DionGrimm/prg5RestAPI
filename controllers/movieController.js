let movieController = (Movie) => {
    let post = (req, res) => {
        let movie = new Movie(req.body)

        movie.save()
        res.status(201).send(movie)
    }

    let get = (req, res) => {

        let query = {}

        if(req.query.year) {
            query.year = req.query.year
        }

        Movie.find(query, (err, movies) => {
            if(err) {
                res.status(500).send(err)
            }
            else {
                let returnMovies = []
                movies.forEach((element, index, array) => {
                    let newMovie = element.toJSON()
                    newMovie._links = {
                        'self': {}
                    }
                    newMovie._links.self = 'http://' + req.headers.host + '/api/movies/' + newMovie._id
                    returnMovies.push(newMovie)
                })

                let _links = {self: 'http://' + req.headers.host + '/api/movies/'}

                currentItems = (total, start, limit) => {

                }
                
                numberOfPages = (total, start, limit) => {

                }
                
                currentPage = (total, start, limit) => {

                }
                
                getFirstQueryString = (total, start, limit) => {

                }
                
                getPreviousQueryString = (total, start, limit) => {

                }

                getLastQueryString = (total, start, limit) => {

                }

                getNextString = (total, start, limit) => {

                }
                
                getPagination = (total, start, limit) => {

                }
                let pagination = {'asdf': 'dummy'}

                res.json({
                    'items': returnMovies,
                    '_links': _links,
                    'pagination': pagination
                })
            }
        })
    }

    return {
        post: post,
        get: get
    }
}

module.exports = movieController