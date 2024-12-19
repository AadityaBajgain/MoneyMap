import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EditExpense from './pages/EditExpense';
const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/edit' element={<EditExpense/>}/>
      </Routes>
    </div>
  )
}

export default App
