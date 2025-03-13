import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Hero from './components/Hero'
import Dashboard from './pages/Dashboard'
import Movies from './pages/movies'

const App = () => {
  return (
    <div>
      <Navbar />
     {/* <Hero />*/}
      <Routes>
        <Route path='/' element={<Dashboard />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/movies' element={<Movies />}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </div>
  )
}

export default App