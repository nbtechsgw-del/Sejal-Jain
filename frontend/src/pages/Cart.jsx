import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
  fetch("http://localhost:5000/cart/user123")
    .then(async (res) => {
      if (!res.ok) {
        throw new Error("API not found");
      }
      return res.json();
    })
    .then((data) => {
      console.log("CART DATA:", data);
      setCart(data.items || []);
    })
    .catch((err) => console.log("ERROR:", err));
}, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div style={{ padding: "20px" }}>

      <h2 style={{ textAlign: "center" }}>YOUR CART</h2>

      {cart.length === 0 ? (
        <p style={{ textAlign: "center" }}>Cart is empty</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                gap: "15px",
                alignItems: "center",
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "10px"
              }}
            >

              {/* IMAGE */}
              <img
                src={item.image}
                width="70"
                height="70"
                style={{ objectFit: "cover" }}
                alt={item.name}
              />

              {/* DETAILS */}
              <div style={{ flex: 1 }}>
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
                <p>Qty: {item.quantity || 1}</p>
              </div>

            </div>
          ))}

          {/* TOTAL */}
          <h3 style={{ textAlign: "right", marginTop: "20px" }}>
            Total: ₹{total}
          </h3>
        </>
      )}

    </div>
  );
};

export default Cart;