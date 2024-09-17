import { useState } from "react"
import Login from "./pages/login/login"
import SignUp from "./pages/signup/signup"
import Home from "./pages/home/home"
import Player from "./pages/player/player"
import { Routes, Route, Navigate } from "react-router-dom"
import Cookies from 'js-cookie';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const userCookie = Cookies.get('user');
  const isUser = userCookie ? JSON.parse(userCookie) : null;

  let [user, setUser] = useState<object|null>(isUser)

  return (
    <>
      <div>
      <ToastContainer theme="dark"/>
        <Routes>
          <Route path="*" element={user ? <Navigate to="/home" /> : <Login setUser={setUser} />} />
          <Route path="/" element={user ? <Navigate to="/home" /> : <Login setUser={setUser} />} />
          <Route path="/login" element={user ? <Navigate to="/home" /> : <Login setUser={setUser} />} />
          <Route path="/signup" element={user ? <Navigate to="/home" /> : <SignUp setUser={setUser} />} />
          <Route path="/home" element={user ? <Home setUser={setUser} /> : <Navigate to="/login" />} />
          <Route path="/player/:id" element={user ? <Player /> : <Navigate to="/login" />} />
        </Routes>
      </div>

    </>
  )
}

export default App
