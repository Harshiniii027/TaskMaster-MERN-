import React, { useEffect, useLayoutEffect } from 'react'
import { Routes,Route, useNavigate } from 'react-router-dom'
import Registration from './Pages/Registration'
import Login from './Pages/Login'
import Dasboards from './Pages/Dasboards'
import HomePage from './Pages/HomePage'
import Help from './components/Help'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
      <Route path='/register' element={<Registration/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/dashboard' element={<Dasboards/>} />
      <Route path='/help' element={<Help/>}/>

      </Routes>
    </>
  )
}

export default App
