import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/authC.jsx'
import "antd/dist/reset.css";
import { SearchProvider } from './context/search'
import { CartProvider } from './context/cart'
ReactDOM.createRoot(document.getElementById('root')).render(
 
  <AuthProvider>
  <SearchProvider>
  <CartProvider >
  <BrowserRouter>
    <App/>
  </BrowserRouter>
  </CartProvider>
  </SearchProvider>
  </AuthProvider>
)
