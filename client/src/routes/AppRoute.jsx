import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Signin from '../pages/Signin'
import Signup from '../pages/Signup'
import Project from '../pages/Project'
import Dashboard from '../pages/Dashboard'

function AppRoute() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/projects' element={<Project/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
  )
}

export default AppRoute
