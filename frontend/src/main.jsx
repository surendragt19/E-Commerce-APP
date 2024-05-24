import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/authC.jsx'
import "antd/dist/reset.css";
ReactDOM.createRoot(document.getElementById('root')).render(
 
  <AuthProvider>
 <BrowserRouter>
    <App/>
  </BrowserRouter>
  </AuthProvider>
 ,
)
