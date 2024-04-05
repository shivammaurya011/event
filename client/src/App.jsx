import { useState } from 'react'
import AppRoute from './routes/AppRoute'
import Header from './components/Header'
import Footers from './components/Footers'

function App() {

  return (
    <div className='dark:bg-[rgb(16, 23, 42)]'>
      <Header/>
      <AppRoute/>
      <Footers/>
    </div>
  )
}

export default App
