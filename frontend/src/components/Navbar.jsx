import React, { useState } from 'react'
import logo from '../assets/logo.png'
import profileIcon from '../assets/profile_icon.png'
import { NavLink, Link } from 'react-router-dom'
import { assets } from '../assets/assets'
const userEmail = localStorage.getItem("userEmail");
const Navbar = ({ cart, search, setSearch }) => {

  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <div style={{ width: '100%', background: 'white' }}>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px'
      }}>

        {/* LOGO */}
        <Link to='/'>
          <img src={logo} width="120" />
        </Link>

        {/* LINKS */}
        <div style={{ display: 'flex', gap: '20px' }}>
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/collection">COLLECTION</NavLink>
          <NavLink to="/about">ABOUT</NavLink>
          <NavLink to="/contact">CONTACT</NavLink>
          <NavLink to="/register">REGISTER</NavLink>
        </div>

        {/* RIGHT SIDE */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>

          {/* ✅ SEARCH INPUT */}
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px"
            }}
          />

          {/* LOGIN */}
          <Link to="/login">Login</Link>

          {/* CART */}
          <Link to="/cart" style={{ position: 'relative' }}>
            <img src={assets.cart_icon} width="20" />

            {/* ✅ CART COUNT */}
            <span style={{
              position: 'absolute',
              top: '-5px',
              right: '-10px',
              background: 'black',
              color: 'white',
              borderRadius: '50%',
              padding: '2px 6px',
              fontSize: '10px'
            }}>
              {cart?.length}
            </span>
          </Link>

        </div>
      </div>
    </div>
  )
}

export default Navbar