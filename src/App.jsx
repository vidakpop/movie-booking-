import React from 'react'
import { Router,Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'

const App = () => {
  return (
    <div>
      <Navbar />
      <Router>
        <Route path='/login' element={<Login />}/>
      </Router>
    </div>
  )
}

export default App