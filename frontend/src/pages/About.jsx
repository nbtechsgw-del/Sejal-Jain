import React from 'react'

const About = () => {
  return (
    <div style={{ padding: '30px', maxWidth: '900px', margin: 'auto' }}>

      {/* TITLE */}
      <h2 style={{
        textAlign: 'center',
        fontSize: '30px',
        fontWeight: '600',
        marginBottom: '15px'
      }}>
        ABOUT US
      </h2>

      {/* PARAGRAPH */}
      <p style={{
        fontSize: '14px',
        color: '#555',
        lineHeight: '1.7',
        textAlign: 'center'
      }}>
        Welcome to our fashion store where style meets comfort.  
        We bring you the latest trends in clothing at affordable prices.  
        Our goal is to make fashion accessible for everyone with high-quality products and a smooth shopping experience.  
        Explore our collection and upgrade your wardrobe with the best styles.
      </p>

      {/* EXTRA BOX */}
      <div style={{
        marginTop: '30px',
        padding: '20px',
        background: '#f5f5f5',
        borderRadius: '10px',
        textAlign: 'center'
      }}>
        <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>
          Why Choose Us?
        </h3>

        <p style={{ fontSize: '13px', color: '#666' }}>
          ✔ Trendy Fashion  
          ✔ Affordable Prices  
          ✔ Fast Delivery  
          ✔ Easy Shopping Experience
        </p>
      </div>

    </div>
  )
}

export default About