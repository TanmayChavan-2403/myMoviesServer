const axios = require('axios');
const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=de43dc736d02ae4de5ff48ba03af9518&language=en-US`
let genres = {}

axios.get(url,{
    headers:{
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZTQzZGM3MzZkMDJhZTRkZTVmZjQ4YmEwM2FmOTUxOCIsInN1YiI6IjYzODc3MjBkOGVlNDljMDA3OWE2MDNiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OT96cA6BzhF7vgPv3OzUPCEnsqFx7ZixN84dOJidOXc`,
        'Accept': 'application/json',
        'Accept-Encoding': 'identity',
    }
})
.then(response => {
    response.data.genres.forEach(genre => {
        genres[genre.name] = genre.id
    });
})
.catch(err => console.log(err));


exports.revGenres = {Action: 28, Adventure: 12, Animation: 16, Comedy: 35, Crime: 80, Documentary: 99,
        Drama: 18, Family: 10751, Fantasy: 14, History: 36, Horror: 27, Music: 10402, Mystery: 9648,
        Romance: 10749, 'Science Fiction': 878,'TV Movie': 10770, Thriller: 53, War: 10752,
        Western: 37
}

exports.genres = {'12': 'Adventure','14': 'Fantasy','16': 'Animation','18': 'Drama', '27': 'Horror', '28': 'Action',
'35': 'Comedy', '36': 'History', '37': 'Western', '53': 'Thriller', '80': 'Crime', '99': 'Documentary',
'878': 'Science Fiction', '9648': 'Mystery', '10402': 'Music','10749': 'Romance', '10751': 'Family',
'10752': 'War', '10770': 'TV Movie'
}
