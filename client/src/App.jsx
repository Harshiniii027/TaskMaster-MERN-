import React, { useEffect, useLayoutEffect } from 'react'
import { Routes,Route, useNavigate } from 'react-router-dom'
import Registration from './Pages/Registration'
import Login from './Pages/Login'
import Dasboards from './Pages/Dasboards'

const App = () => {
  return (
    <>
      <Routes>
      <Route path='/register' element={<Registration/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/dashboard' element={<Dasboards/>} />

      </Routes>
    </>
  )
}

export default App
