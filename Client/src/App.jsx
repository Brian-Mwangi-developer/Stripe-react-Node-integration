import React, { useState } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import HomePage from './components/HomePage'
import SuccessPage from './components/SuccessPage'
import CancelPage from './components/CancelPage'
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/success' element={<SuccessPage/>}/>
      <Route path='/cancel' element={<CancelPage/>}/>

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
