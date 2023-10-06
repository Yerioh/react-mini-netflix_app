import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux' 
import Carousel from 'react-bootstrap/Carousel'
import Badge from 'react-bootstrap/esm/Badge'

const Banner2 = ({ name, movies }) => {
  const navigate = useNavigate()
  // redux 가져오기
  const genres = useSelector(state=>state.movie.genreList) 
  /** 상세페이지 이동 함수 */
  const moveMovieDetail = (id)=>{
    navigate(`/movies/${id}`)
  }
  return (
    <div className="banner2">
      <h1>{name}</h1>
      <Carousel data-bs-theme="dark">
        {movies.map((item) => (
          <Carousel.Item key={item.id} className="banner2-item" onClick={()=>moveMovieDetail(item.id)}>
            <img
              src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
              alt=""
            />
            <div className="banner2-item-info">
              <h1>{item.title}</h1>
              <span>{item.overview}</span>
              <br />
              <div className='genre'>
                {item.genre_ids.map((item, index) => (
                  <Badge bg="danger" key={index}>
                    {genres.find((item2) => item2.id === item)?.name}
                  </Badge>
                ))}
              </div>
              <br />
              <span>⭐{item.vote_average}</span>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}

export default Banner2
