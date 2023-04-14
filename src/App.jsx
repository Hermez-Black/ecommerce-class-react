import { useState } from 'react'
import './App.css'
import "bootswatch/dist/cerulean/bootstrap.min.css";
import NavBar from './components/NavBar';
import Loader from './components/Loader';
import Home from './pages/Home';
import Purchases from './pages/Purchases';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import {
  HashRouter,
  Routes,
  Route
} from 'react-router-dom'
import { useSelector } from 'react-redux';
import ProtectedRoutes from './components/ProtectedRoutes';

export default function App() {
  const isLoading = useSelector(state => state.isLoading)
  // redux
  // router dom
  // boostrap
  return (
    <HashRouter>
      <div className='App'>
        { isLoading && <Loader /> }
        <NavBar></NavBar>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
        </Route>
      </Routes>
      </div>
    </HashRouter>
  );
}