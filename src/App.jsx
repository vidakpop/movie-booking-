import React from 'react'
import { Routes,Route ,BrowserRouter as Router} from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Hero from './components/Hero'
import Dashboard from './pages/Dashboard'
import Movies from './pages/movies'
import Moviedetails from './pages/Moviedetails'
import BookingsPage from './pages/BookingsPage'
import Booking from './pages/Booking'
import Payment from './pages/Payment'
import Confirmation from './pages/Confirmation'

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
        <Route path='/movies/:id' element={<Moviedetails/>}/>
        <Route path='/bookings/:movieId' element={<Booking/>}/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/mybooking' element={<BookingsPage/>}/>
        <Route path='/confirmation' element={<Confirmation/>}/>
      </Routes>
    </div>
  )
}

export default App