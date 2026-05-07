import React, { useState } from 'react'

const Contact = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    if (name && email && message) {
      alert("Message sent successfully 👍 (Demo)")
      setName('')
      setEmail('')
      setMessage('')
    } else {
      alert("Please fill all fields")
    }
  }

  return (
    <div style={{
      maxWidth: '500px',
      margin: 'auto',
      padding: '30px'
    }}>

      {/* TITLE */}
      <h2 style={{
        textAlign: 'center',
        fontSize: '28px',
        fontWeight: '600',
        marginBottom: '20px'
      }}>
        CONTACT US
      </h2>

      {/* NAME */}
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px'
        }}
      />

      {/* EMAIL */}
      <input
        type="email"
        placeholder="Your Email"
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

      {/* MESSAGE */}
      <textarea
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows="4"
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '15px',
          border: '1px solid #ccc',
          borderRadius: '5px'
        }}
      />

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
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
        Send Message
      </button>

    </div>
  )
}

export default Contact