import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'

const SearchMovieCard = ({ movie }) => {
  const navigate = useNavigate()
  const genres = useSelector((state) => state.movie.genreList)

  const moveMovieDetail = ()=>{
    navigate(`/movies/${movie.id}`)
  }
  return (
    <div className="search-moviecard">
      <div className="search-moviecard-img">
        <img
          src={`https://www.themoviedb.org/t/p/original${movie?.poster_path}`}
          alt="이미지 없음"
          onClick={moveMovieDetail}
        />
      </div>
      <div className="search-moviecard-info">
        <div className="genre">
          {movie.genre_ids.map((item, index) => (
            <Badge bg="danger" key={index}>
              {genres.find((item2) => item2.id === item)?.name}
            </Badge>
          ))}
        </div>
        <h1 onClick={moveMovieDetail}>{movie.title}</h1>
        <p>{movie.overview}</p>
        <span>
          ⭐{movie.vote_average} |{' '}
          {movie.adult === true ? '청소년 관람 불가' : '청소년 관람 가능'}
        </span>
      </div>
    </div>
  )
}

export default SearchMovieCard
