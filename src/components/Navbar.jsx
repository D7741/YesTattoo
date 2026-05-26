import React from 'react';
import { Link } from 'react-router-dom';


// 2. Create a Navigation component using the <Link> component (not <a> tags)
const Navbar = () => (
  <nav>
    <Link to="/">Home</Link> | 
    <Link to="/about">About</Link> |
    <Link to="/admin">Admin</Link> |
    <Link to="/appointments">Appointments</Link> |
    <Link to="/artists">Artists</Link> |
    <Link to="/contact">Contact</Link> |
  </nav>
);

export default Navbar