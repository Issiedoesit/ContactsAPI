import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import About from './components/About/About'
import Books from './components/Books/Books'
import Home from './components/Home/Home'

function App() {

  return (
    <div className='bg-slate-950'>
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/books' element={<Books />} />
      </Routes>
    </div>
  )
}

export default App
