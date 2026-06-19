import React, { useContext } from 'react'
import Home from './pages/Home'
import ByCredit from './pages/ByCredit'
import OutputFinal from './pages/OutputFinal'
import { Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from './context/AppContext'

const App = () => {
  const{showlogin}=useContext(AppContext)
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen text-white relative z-10 pt-28 pb-10'>
      <Navbar/>
      {showlogin && <Login/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/result' element={<OutputFinal/>}/>
        <Route path='/buy' element={<ByCredit/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App