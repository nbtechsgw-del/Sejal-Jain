import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import { useNavigate } from 'react-router-dom'

const BestSeller = () => {

  const { products } = useContext(ShopContext)
  const [bestSeller, setBestSeller] = useState([])

  const navigate = useNavigate()

  // 🔥 filter best seller products
  useEffect(() => {
    if (products && products.length > 0) {
      const bestProduct = products.filter((item) => item.bestseller)
      setBestSeller(bestProduct.slice(0, 5))
    }
  }, [products])

  return (
    <div style={{ marginTop: '40px' }}>

      {/* 🔹 Title */}
      <div style={{ textAlign: 'center' }}>
        <Title text1="BEST" text2="SELLERS" />

        <p style={{
          fontSize: '13px',
          color: '#666',
          marginTop: '5px'
        }}>
          Trendy styles. Comfortable fits. Shop now.
        </p>
      </div>

      {/* 🔥 GRID + HOVER */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '15px',
        marginTop: '20px',
        padding: '0 10px'
      }}>

        {
          bestSeller.map((item, index) => (
            
            <div 
              key={index}
              onClick={() => navigate(`/product/${item._id}`)}
              style={{ 
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >

              {/* IMAGE */}
              <div style={{ overflow: 'hidden' }}>
                <img
                  src={item?.image?.[0]}
                  alt=""
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    transition: '0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                />
              </div>

              {/* NAME */}
              <p style={{
                marginTop: '8px',
                fontSize: '14px'
              }}>
                {item?.name}
              </p>

              {/* PRICE */}
              <p style={{
                fontWeight: '600',
                fontSize: '14px'
              }}>
                ₹{item?.price}
              </p>

            </div>
          ))
        }

      </div>

    </div>
  )
}

export default BestSeller