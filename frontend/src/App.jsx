import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EditExpense from './pages/EditExpense';
import Footer from './components/Footer';
const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/edit' element={<EditExpense/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
