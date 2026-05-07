import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import { useNavigate } from 'react-router-dom'

const LatestCollection = () => {

  const { products } = useContext(ShopContext)
  const [latestProducts, setLatestProducts] = useState([])

  const navigate = useNavigate()

  // 🔥 get first 14 products
  useEffect(() => {
    if (products && products.length > 0) {
      setLatestProducts(products.slice(0, 16))
    }
  }, [products])

  return (
    <div style={{
      width: '100%',
      textAlign: 'center',
      marginTop: '20px'
    }}>

      {/* 🔹 Title */}
      <Title text1="LATEST" text2="COLLECTIONS" />

      {/* 🔹 Description */}
      <p style={{
        marginTop: '2px',
        fontSize: '12px',
        color: '#666',
        maxWidth: '450px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        Explore trendy and stylish clothing at affordable prices.
      </p>

      {/* 🔥 PRODUCTS GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '15px',
        marginTop: '20px',
        padding: '0 10px'
      }}>

        {
          latestProducts.map((item, index) => (
            
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

export default LatestCollection