import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar'

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