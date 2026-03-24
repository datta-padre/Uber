import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../src/pages/Home'
import UserLogin from '../src/pages/UserLogin'
import UserSignup from '../src/pages/UserSignUp'
import CaptainLogin from './pages/CaptinLogin'
import CaptainSignUp from '../src/pages/CaptainSignUp'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<UserLogin />} />
      <Route path='/signup' element={<UserSignup />} />
      <Route path='/captain-login' element={<CaptainLogin />} />
      <Route path='/captain-signup' element={<CaptainSignUp />} />
    </Routes>
  )
}

export default App;