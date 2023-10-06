import React, { useEffect, useState } from 'react'
import { Accordion, Dropdown, Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Movies = () => {
  const navigate = useNavigate()

  const popualrMovies = useSelector((state) => state.movie.popularMovies)
  const [movies, setMovies] = useState([])
  /** 정렬기능 */
  const sortMovies = (e) => {
    /*
      React에서 state는 불변성을 유지해야 하기 때문에
      전개 연산자를 통해서 새로운 배열을 생성하고 sort()함수를 실행햐여 한다.
      정렬된 배열을 state에 다시 초기화 해주면 영화정보가 정렬되어 출력된다.
    */
    let m = [...movies]
    const keyword = e.target.innerText.split(' ')
    if (keyword[0] === '제목') {
      if (keyword[1] === '오름차순') {
        m.sort((a, b) => {return a.title.localeCompare(b.title)})
      } else {
        m.sort((a, b) => {return b.title.localeCompare(a.title)})
      }
      setMovies(m)
    } else if (keyword[0] === '평점') {
      if (keyword[1] === '오름차순') {
        m.sort((a, b) => {return a.vote_average - b.vote_average})
      } else {
        m.sort((a, b) => {return b.vote_average - a.vote_average})
      }
      setMovies(m)
    } else if (keyword[0] === '인기도') {
      if (keyword[1] === '오름차순') {
        m.sort((a, b) => { return a.popularity - b.popularity})
      } else {
        m.sort((a, b) => {return b.popularity - a.popularity})
      }
      setMovies(m)
    }
  }
  /** 영화 상세페이지 이동 */
  const moveDetail = (id) => {
    navigate(`/movies/${id}`)
  }
  useEffect(() => {
    if (popualrMovies.length !== 0) {
      setMovies(popualrMovies)
    }
  }, [popualrMovies])
  return (
    <div className="movies">
      <div className="movies-sort">
        <h1>인기영화 필터링</h1>
        <Accordion>
          <Accordion.Item>
            <Accordion.Header>정렬</Accordion.Header>
            <Accordion.Body>
              <Dropdown data-bs-theme="dark">
                <Dropdown.Toggle variant="secondary">정렬방식을 선택하세요.</Dropdown.Toggle>
                <Dropdown.Menu variant="secondary">
                  <Dropdown.Item onClick={sortMovies}>제목 오름차순</Dropdown.Item>
                  <Dropdown.Item onClick={sortMovies}>제목 내림차순</Dropdown.Item>
                  <Dropdown.Item onClick={sortMovies}>평점 오름차순</Dropdown.Item>
                  <Dropdown.Item onClick={sortMovies}>평점 내림차순</Dropdown.Item>
                  <Dropdown.Item onClick={sortMovies}>인기도 오름차순</Dropdown.Item>
                  <Dropdown.Item onClick={sortMovies}>인기도 내림차순</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <div className="movies-cardbox">
        {movies.map((item) => (
          <Card key={item.id} className="movies-cardbox-card" onClick={()=>moveDetail(item.id)}>
            <Card.Img variant="top" src={`https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`}/>
            <Card.Body>
              <Card.Title>{item.title.length > 10 ? `${item.title.substr(0, 10)}...` : item.title}</Card.Title>
              <Card.Text>{item.release_date}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Movies
