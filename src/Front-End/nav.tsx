import React from 'react'
import { Link } from 'react-router-dom'


export default function Nav() {
  return (
      <div className="nav1">
        <h2>Marvy's Place</h2>
        <ul>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>Home</Link>
          <Link to="" style={{ textDecoration: "none", color: "white" }}>Services</Link>
          <Link to="/rooms" style={{ textDecoration: "none", color: "white" }}>Rooms</Link>
          <Link to="/about" style={{ textDecoration: "none", color: "white"}}>About Us</Link>
        </ul>
        <button>Join Member</button>
      </div>
  )
}
