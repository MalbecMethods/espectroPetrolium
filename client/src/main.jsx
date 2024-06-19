import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/AuthContext'
import { Index } from "./page/Index.jsx";
import { Login } from "./page/Login.jsx";
import { News } from "./page/News.jsx";
import { Maps } from "./page/Maps.jsx";
import { Dashboard } from "./page/Dashboard.jsx";
import Header from './components/Headers.jsx';

import PrivateRoute from './utils/PrivateRoute.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element=<Dashboard /> />
        <Route path="/news" element=<News /> />
        <Route path="/maps" element=<Maps /> />
      </Routes>
      </AuthProvider>
  </BrowserRouter>
)
