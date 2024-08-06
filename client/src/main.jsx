import ReactDOM from 'react-dom/client'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/AuthContext'
import { Index } from "./page/Index.jsx";
import { Login } from "./page/Login.jsx";
import { News } from "./page/News.jsx";
import { Maps } from "./page/Maps.jsx";
import { Dashboard } from "./page/Dashboard.jsx";
import { List } from "./page/List.jsx";
import PrivateRoute from './utils/PrivateRoute.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <AuthProvider>
        <Routes>
        <Route path="/" element={<PrivateRoute><Index /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/news" element={<PrivateRoute><News /></PrivateRoute>} />
        <Route path="/maps" element={<PrivateRoute><Maps /></PrivateRoute>} />
        <Route path="/list" element={<PrivateRoute><List /></PrivateRoute>} />
      </Routes>
      </AuthProvider>
  </BrowserRouter>
)
