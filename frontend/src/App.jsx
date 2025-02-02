import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EditExpense from './pages/EditExpense';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuthContext } from './hooks/UseAuthContext';
const App = () => {
  const {user} = useAuthContext();
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex-grow'>
        <Routes>
          <Route path='/' element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path='/signup' element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path='/edit/:id' element={user ? <EditExpense /> : <Navigate to="/login" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
