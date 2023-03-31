import { useState } from 'react'
import './App.css'
import "bootswatch/dist/vapor/bootstrap.min.css";
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Purchases from './pages/Purchases';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import {
  HashRouter,
  Routes,
  Route
} from 'react-router-dom'

export default function App() {
  // redux
  // router dom
  // boostrap
  return (
    <HashRouter>
      <div className='App'>
        <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
      </Routes>
      </div>
    </HashRouter>
  );
}