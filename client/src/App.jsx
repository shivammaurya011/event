import { useState } from 'react'
import AppRoute from './routes/AppRoute'
import Header from './components/Header'
import Footers from './components/Footers'

function App() {

  return (
    <>
      <Header/>
      <AppRoute/>
      <Footers/>
    </>
  )
}

export default App
