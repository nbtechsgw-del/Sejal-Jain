import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Please fill all fields")
      return
    }

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      setMessage(data.message)

      if (data.token) {
  localStorage.setItem("token", data.token)
  localStorage.setItem("userEmail", email);
}

      // ✅ login success
      if (data.token) {
        setTimeout(() => {
            window.location.href = "/home"; // later you can change to home/dashboard
        }, 1000)
      }

    } catch (error) {
      setMessage("Something went wrong")
    }
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5'
    }}>

      <div style={{
        width: '320px',
        padding: '25px',
        background: 'white',
        borderRadius: '10px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
      }}>

        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          Login
        </h2>

        
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px'
          }}
        />

        
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '5px'
          }}
        />

        
        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Login
        </button>

        
        <p style={{
          marginTop: '10px',
          fontSize: '12px',
          textAlign: 'center',
          color: message.includes("success") ? "green" : "red"
        }}>
          {message}
        </p>

        
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Don't have account? <Link to="/register">Register</Link>
        </p>

      </div>

    </div>
  )
}

export default Login