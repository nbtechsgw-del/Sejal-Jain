import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";

const Collection = ({ addToCart, search }) => {

  const { products } = useContext(ShopContext);

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>

      <h2>ALL COLLECTIONS</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "15px"
      }}>

        {filteredProducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
            addToCart={addToCart}   // ✔ IMPORTANT
          />
        ))}

      </div>

    </div>
  );
};

export default Collection;