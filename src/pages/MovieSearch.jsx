import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from '../api'
import { useDispatch, useSelector } from 'react-redux'
import { movieReducerActions } from '../redux/reducers/movieSlice'
import SearchMovieCard from '../components/SearchMovieCard'
import ClipLoader from 'react-spinners/ClipLoader'

const MovieSearch = () => {
  const { state } = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const searchMovies = useSelector((state) => state.movie.searchList)

  // loader 스타일 정의
  const loaderStyle = {
    position: 'absolute',
    top: '40%',
    left: '40%',
    transform: 'translate(-50%,-50%)',
  }

  useEffect(() => {
    const getSearchData = async () => {
      setIsLoading(true)
      const res = await axios.get(
        `/search/movie?query=${state}&language=ko-KR&page=1`
      )
      dispatch(movieReducerActions.searchData(res.data.results))
      setIsLoading(false)
    }
    getSearchData()
  }, [state, dispatch])
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
        <div className="search-movies">
          <p>'{state}' 검색 결과</p>
          {searchMovies.map((item) => (
            <SearchMovieCard key={item.id} movie={item} />
          ))}
        </div>
      )}
    </>
  )
}

export default MovieSearch
