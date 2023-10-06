import React, { useEffect, useState } from 'react'
import axios from '../api'
import { useSelector, useDispatch } from 'react-redux'
import { movieReducerActions } from '../redux/reducers/movieSlice'
import Banner from '../components/Banner'
import MovieSlide from '../components/MovieSlide'
// 개인 실습 컴포넌트
// import Banner2 from '../components/Banner2'
import ClipLoader from 'react-spinners/ClipLoader'

const Home = () => {
  // react-spinners용 state
  const [isLoading, setIsLoading] = useState(false)
  // redux 가져오기
  const dispatch = useDispatch()
  const popularMovies = useSelector((state) => state.movie.popularMovies)
  const topRatedMovies = useSelector((state) => state.movie.topRatedMovies)
  const upcomingMovies = useSelector((state) => state.movie.upcomingMovies)
  // loader 스타일 정의
  const loaderStyle = {
    position: 'absolute',
    top: '40%',
    left: '40%',
    transform: 'translate(-50%,-50%)',
  }

  // 랜덤 배너용 랜덤 숫자
  const num = parseInt(Math.random() * 20)
  // 페이지 마운트 시, 데이터 불러오기
  useEffect(() => {
    const getMovieList = async () => {
      setIsLoading(true)
      const popularList = axios.get('/movie/popular?language=ko-KR&page=1')
      const topRatedList = axios.get('/movie/top_rated?language=ko-KR&page=1')
      const upcomingList = axios.get('/movie/upcoming?language=ko-KR&page=1')
      const genreList = axios.get('/genre/movie/list?language=ko')
      const [popular, topRated, upcoming, genres] = await Promise.all([
        popularList,
        topRatedList,
        upcomingList,
        genreList,
      ])
      dispatch(
        movieReducerActions.initData({
          popular: popular.data.results,
          topRated: topRated.data.results,
          upcoming: upcoming.data.results,
          genres: genres.data.genres,
        })
      )
      setIsLoading(false)
    }
    getMovieList()
  }, [dispatch])
  return (
    <>
      {isLoading ? (
        <ClipLoader loading={isLoading} color="white" size={300} cssOverride={loaderStyle} speedMultiplier={.5}/>
      ) : (
        <div className="home">
          <Banner movie={popularMovies[num]} />

          <MovieSlide name="인기 영화" movies={popularMovies} />
          <MovieSlide name="TOP 20" movies={topRatedMovies} />
          <MovieSlide name="개봉 예정작" movies={upcomingMovies} />

          {/* 개인 */}
          {/* 
          <Banner2 name="인기 영화" movies={popularMovies} />
          <Banner2 name="TOP 20" movies={topRatedMovies} />
          <Banner2 name="개봉 예정" movies={upcomingMovies} />
         */}
        </div>
      )}
    </>
  )
}

export default Home
