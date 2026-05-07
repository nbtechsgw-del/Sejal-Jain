import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {

  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => {
        const found = data.find(item => item._id === id);
        setProduct(found);
      });
  }, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>

      <img
        src={product.image}
        alt=""
        style={{ width: "250px", borderRadius: "10px" }}
      />

      <h2>{product.name}</h2>
      <h3>₹ {product.price}</h3>

      <button style={{
        padding: "10px 20px",
        background: "black",
        color: "white",
        border: "none",
        marginTop: "10px"
      }}>
        Add to Cart
      </button>

    </div>
  );
};

export default ProductDetails;