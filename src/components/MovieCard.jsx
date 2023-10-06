import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'

const MovieCard = ({ movie }) => {
 
  const genres = useSelector((state) => state.movie.genreList)
  const divStyle = {
    backgroundImage: `url(https://www.themoviedb.org/t/p/original${movie?.poster_path})`,
  }

  return (
    <div style={divStyle} className="moviecard">
      <Link to={`/movies/${movie.id}`}>
        <div className="moviecard-info">
          <h3>{movie.title}</h3>
          <span></span>
          <div className="genre">
            {movie.genre_ids.map((item, index) => (
              <Badge bg="danger" key={index}>
                {genres.find((item2) => item2.id === item)?.name}
              </Badge>
            ))}
          </div>
          <span>
            ⭐{movie.vote_average} |{' '}
            {movie.adult === true ? '청소년 관람 불가' : '청소년 관람 가능'}
          </span>
        </div>
      </Link>
    </div>
  )
}

export default MovieCard
