import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ id, image, name, price, addToCart }) => {
  const { currency } = useContext(ShopContext);

  return (
    <div className="text-gray-700">

      {/* PRODUCT IMAGE + DETAILS LINK */}
      <Link
        to={`/product/${id}`}
        style={{ textDecoration: "none", color: "black" }}
      >

        <div className="overflow-hidden">
          <img
            src={Array.isArray(image) ? image[0] : image}
            alt={name}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover"
            }}
          />
        </div>

        <p style={{ marginTop: "8px" }}>{name}</p>

        <p style={{ fontWeight: "600" }}>
          {currency}{price}
        </p>

      </Link>

      {/* ADD TO CART BUTTON */}
      <button
        onClick={() =>
          addToCart?.({
            id,
            image: Array.isArray(image) ? image[0] : image,
            name,
            price
          })
        }
        style={{
          marginTop: "5px",
          padding: "8px",
          width: "100%",
          background: "black",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Add to Cart
      </button>

    </div>
  );
};

export default ProductItem;