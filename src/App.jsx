import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Admin from './pages/Admin.jsx'
import Appointments from './pages/Appointments.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'
import Artists from './pages/Artists.jsx'

import Navbar from './components/Navbar.jsx'


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      {/* 3. Define the Route registry */}
      <Routes>
        {/* 'element' takes a JSX component instance, not a component reference */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Catch-all route for unmatched paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
