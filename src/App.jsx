import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css' 
import './App.css'

import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'
import Register from './components/Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom';


// Admin components
import AdminApp from "./admin-components/AdminApp";

function App() {
  const [count, setCount] = useState(0)
const isAdminRoute = location.pathname.startsWith("/dashboard");
const [searchQuery, setSearchQuery] = useState("");

  return (
    <> 
    <BrowserRouter>
     {!isAdminRoute && <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/aboutus" element={<AboutUs/>} />
       <Route path="/contact" element={<ContactUs/>} />
       <Route path="/register" element={<Register/>} />
     
       {/* <Route path="/dashboard" element={<AdminApp/>} /> */}
    </Routes>
     {!isAdminRoute && <Footer />}
    </BrowserRouter> 
    <AdminApp/>
    </>
  )
}

export default App
