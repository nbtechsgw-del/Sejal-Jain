import { useEffect, useState } from "react";

const Product = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data); // debug
        setProducts(data);
      })
      .catch((err) => console.log("FETCH ERROR:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>

      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <div>
          {products.map((item) => (
            <div
              key={item._id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "10px",
              }}
            >

              
              <img
                src={item.image?.[0] || "https://via.placeholder.com/120"}
                width="120"
                alt={item.name}
              />

              <h3>{item.name}</h3>
              <p>₹{item.price}</p>

              
              <button
                style={{
                  padding: "10px",
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  marginTop: "8px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  console.log("ADD TO CART CLICKED:", item);
                  addToCart(item);
                }}
              >
                Add to Cart
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;