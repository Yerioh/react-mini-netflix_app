import axios from 'axios'

const api = axios.create({
    baseURL : 'https://api.themoviedb.org/3',
    headers : {
        accept : 'application/json',
        Authorization : `Bearer ${process.env.REACT_APP_TMDB_ACCES_TOKEN}`
    },
})

export default api