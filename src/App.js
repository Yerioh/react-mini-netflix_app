import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetail from './pages/MovieDetail'
import Header from './components/Header'
import MovieSearch from './pages/MovieSearch'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path='/search' element={<MovieSearch/>}/>
        <Route path="/movies/:id" element={<MovieDetail />} />
      </Routes>
    </>
  )
}

export default App
