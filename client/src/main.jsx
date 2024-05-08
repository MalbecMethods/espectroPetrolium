import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Index } from "./page/Index.jsx";
import { Login } from "./page/Login.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
)
