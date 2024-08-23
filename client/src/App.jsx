import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Product from './pages/Product';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import OAuthCallback from './pages/OAuthCallback'; 
import { AuthContext } from './AuthContext';

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/signin" />} />
      <Route path="/signin" element={isLoggedIn ? <Navigate to="/" /> : <Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/product" element={isLoggedIn ? <Product /> : <Navigate to="/signin" />} />
      <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/signin" />} />
      <Route path="/auth/google" element={<OAuthCallback />} /> {/* New route */}
    </Routes>
  );
}

export default App;
