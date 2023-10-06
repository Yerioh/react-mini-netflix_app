import React, { useRef } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, useNavigate } from 'react-router-dom'


const Header = () => {

  const navigate = useNavigate()
  const inputRef = useRef('')
  /** 검색 함수 */
  const searchMovies = (e) => {
    e.preventDefault()
    navigate('/search', { state: inputRef.current.value })
    inputRef.current.value = ''
  }
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="header">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            src="https://www.edigitalagency.com.au/wp-content/uploads/netflix-logo-png-large.png"
            alt=""
            style={{ width: '100px' }}
          />
        </Navbar.Brand>
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <div className="header-nav">
            <Link to="/" className="nav-item">
              Home
            </Link>
            <Link to="/movies" className="nav-item">
              Movies
            </Link>
          </div>
        </Nav>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="검색할 영화명..."
            className="me-2"
            aria-label="Search"
            ref={inputRef}
          />
          <Button type="submit" variant="outline-danger" onClick={searchMovies}>
            Search
          </Button>
        </Form>
      </Container>
    </Navbar>
  )
}

export default Header
