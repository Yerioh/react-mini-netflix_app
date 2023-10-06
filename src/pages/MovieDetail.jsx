import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from '../api'
import { movieReducerActions } from '../redux/reducers/movieSlice'
import Badge from 'react-bootstrap/Badge'
import ClipLoader from 'react-spinners/ClipLoader'
import ReviewCard from '../components/ReviewCard'

const MovieDetail = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  // redux 가져오기
  const detailData = useSelector((state) => state.movie.detailData)
  const reviewList = useSelector((state) => state.movie.reviews)
  const dispatch = useDispatch()
  // loader 스타일 정의
  const loaderStyle = {
    position: 'absolute',
    top: '40%',
    left: '40%',
    transform: 'translate(-50%,-50%)',
  }

  // 데이터 마운트
  useEffect(() => {
    const getDetailData = async () => {
      setIsLoading(true)
      const movieData = axios.get(`/movie/${id}?language=ko-KR`)
      const reviewList = axios.get(
        `https://api.themoviedb.org/3/movie/${id}/reviews?page=1`
      )
      const [movie, reviews] = await Promise.all([movieData, reviewList])
      dispatch(movieReducerActions.detailData(movie.data))
      dispatch(movieReducerActions.reviewData(reviews.data.results))
      setIsLoading(false)
    }
    getDetailData()
  }, [id, dispatch])
  return (
    <>
      {isLoading ? (
        <ClipLoader
          loading={isLoading}
          color="white"
          size={300}
          cssOverride={loaderStyle}
          speedMultiplier={0.5}
        />
      ) : (
        <>
          <div className="movie-detail">
            <div className="movie-detail-img">
              <img
                src={`https://www.themoviedb.org/t/p/original${detailData?.poster_path}`}
                alt=""
              />
            </div>
            <div className="movie-detail-info">
              <div className="genre">
                {detailData.genres?.map((item, index) => (
                  <h4 key={index}>
                    <Badge bg="danger">{item.name}</Badge>
                  </h4>
                ))}
              </div>
              <h1>{detailData.title}</h1>
              <p>{detailData.tagline}</p>
              <p>
                개봉일 : {detailData.release_date} | 평점 :{' '}
                {detailData.vote_average} |{' '}
                {detailData.adult ? '청소년 관람 불가' : '청소년 관람 가능'}
              </p>
              <p
                style={{
                  borderTop: '3px double lightgray',
                  borderBottom: '3px double lightgray',
                  padding: '30px 0',
                  width: '100%',
                }}
              >
                {detailData.overview}
              </p>
            </div>
          </div>
          <div className='movie-review'>
            <h2>Reviews</h2>
                {reviewList?.map(item=>(
                  <ReviewCard key={item.id} review={item}/>
                ))}
          </div>
        </>
      )}
    </>
  )
}

export default MovieDetail
