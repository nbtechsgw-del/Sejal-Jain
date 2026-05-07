import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      margin: '5px 0'   // 👈 30px se 5px kar diya
    }}>

      <h1 style={{
        fontSize: '28px',
        fontWeight: '700',
        textTransform: 'uppercase',
        margin: 0
      }}>
        {text1} <span style={{ fontWeight: '700' }}>{text2}</span>
      </h1>

      <div style={{
        width: '40px',
        height: '2px',
        backgroundColor: 'black'
      }}></div>

    </div>
  )
}

export default Title