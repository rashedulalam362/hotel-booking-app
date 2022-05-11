import React from 'react'
import './Navbar.css';
const Navbar = () => {
  return (
    <div className="navbar">
        <div className="navbarConatiner">
          <div className="navbar-logo">
            Hotel booking
            </div>  
            <div className="navbar-list">
            <button className="navButton">Register</button>
           <button className="navButton">Login</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar