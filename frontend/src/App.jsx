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
  const { user } = useAuthContext();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.25),_transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(16,185,129,0.3),_transparent_40%)]" />
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col text-slate-100">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path='/' element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path='/signup' element={!user ? <Signup /> : <Navigate to="/" />} />
            <Route path='/edit/:id' element={user ? <EditExpense /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App
