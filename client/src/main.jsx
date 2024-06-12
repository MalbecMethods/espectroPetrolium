import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Index } from "./page/Index.jsx";
import { Login } from "./page/Login.jsx";
import { Dashboard } from "./page/Dashboard.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
)
