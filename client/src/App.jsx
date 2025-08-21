import React, { useEffect, useLayoutEffect } from 'react'
import { Routes,Route, useNavigate } from 'react-router-dom'
import Registration from './Pages/Registration'
import Login from './Pages/Login'
import Performance from './Pages/Performance'
import Dasboards from './Pages/Dasboards'
import HomePage from './Pages/HomePage'
import Help from './components/Help'
import Settings from './components/Settings'


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
      <Route path='/register' element={<Registration/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/dashboard' element={<Dasboards/>} />
      <Route path='/performance' element={<Performance/>}/>
      <Route path='/help' element={<Help/>}/>
      <Route path='/settings' element={<Settings/>} />


      </Routes>
    </>
  )
}

export default App
