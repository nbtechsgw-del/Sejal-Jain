import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (

    <div style={{
      border: '1px solid #ddd',   // light thin border
      width: '80%',
      margin: '40px auto',        // center box
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px'
    }}>

      {/* 🔹 LEFT TEXT */}
      <div style={{ width: '50%' }}>
        <p>OUR BESTSELLERS</p>

        <h1 style={{
          fontWeight: 'bold',
          fontSize: '32px',
          margin: '10px 0'
        }}>
          LATEST COLLECTION
        </h1>

        <p>SHOP NOW</p>
      </div>

      {/* 🔹 RIGHT IMAGE */}
      <div style={{ width: '50%' }}>
        <img
          src={assets.hero_img}
          alt="hero"
          style={{
            width: '100%',
            height: '250px',
            objectFit: 'cover'
          }}
        />
      </div>

    </div>

  )
}

export default Hero