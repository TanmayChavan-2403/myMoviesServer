const express = require('express');
require('dotenv').config();
const axios = require('axios');
var cors = require('cors');
const genre_object = require('./utilityFunctions');


app = express();
app.use(express.json());
app.use(cors());

const api_key = process.env.API_KEY;

app.get('/', (req, res) => {
    res.json({status: "Server is up and running 😀"}).end();
})

app.post('/search', (req, res) => {
    const movie_name = req.body.movie_name.split(" ").join("+");
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${movie_name}`;
    axios.get(url, {
        headers:{
            'Authorization': `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
            'Accept': 'application/json',
            'Accept-Encoding': 'identity',
        }
    })
    .then(response => { 
        let result = []
        response.data.results.map(data => {
            let responseOBJ = {}
            let computed_genres = []
            data.genre_ids.forEach(id => {
                computed_genres.push(genre_object.genres[id]);
            });
            responseOBJ.title = data.original_title;
            responseOBJ.posterImage = "https://image.tmdb.org/t/p/w500" + data.backdrop_path;
            responseOBJ.thumbnail = "https://image.tmdb.org/t/p/w500" + data.poster_path;
            responseOBJ.release_date = data.release_date;
            responseOBJ.synopsis = data.overview;
            responseOBJ.genres = computed_genres;
            result.push(responseOBJ);
        })
        res.json(result).end();
    })
    .catch(error => {
        console.log(error);
        res.json({success: false})
    })

})

app.post('/searchByGenre', (req, res) => {
    const genId = req.body.genId;
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${genId}&page=1`;
    axios.get(url, {
        headers:{
            'Authorization': `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
            'Accept': 'application/json',
            'Accept-Encoding': 'identity',
        }
    })
    .then(response => {
        let result = []
        response.data.results.map(data => {
            let responseOBJ = {}
            let computed_genres = []
            data.genre_ids.forEach(id => {
                computed_genres.push(genre_object.genres[id]);
            });
            responseOBJ.title = data.original_title;
            responseOBJ.posterImage = "https://image.tmdb.org/t/p/w500" + data.backdrop_path;
            responseOBJ.thumbnail = "https://image.tmdb.org/t/p/w500" + data.poster_path;
            responseOBJ.release_date = data.release_date;
            responseOBJ.synopsis = data.overview;
            responseOBJ.genres = computed_genres;
            result.push(responseOBJ);
        })
        res.json(result).end();
    })
    .catch(err => res.json(err).end());
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})