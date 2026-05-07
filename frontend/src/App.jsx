import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";

import Navbar from "./components/Navbar";

const App = () => {

  //  TOKEN STATE 
  const [token, setToken] = useState(localStorage.getItem("token"));

  //  detect login/logout changes
  useEffect(() => {
    const interval = setInterval(() => {
      setToken(localStorage.getItem("token"));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  //  CART STATE
  const [cart, setCart] = useState([]);

  //  SEARCH STATE
  const [search, setSearch] = useState("");

  //  ADD TO CART
  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  //  REMOVE FROM CART
  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      {/* Navbar only when logged in */}
      {token && (
        <Navbar
          cart={cart}
          search={search}
          setSearch={setSearch}
        />
      )}

      <Routes>

        {/* LOGIN PAGE */}
        <Route
          path="/"
          element={token ? <Navigate to="/home" /> : <Login />}
        />

        {/* REGISTER PAGE */}
        <Route path="/register" element={<Register />} />

        {/* HOME */}
        <Route
          path="/home"
          element={token ? <Home /> : <Navigate to="/" />}
        />

        {/* COLLECTION */}
        <Route
          path="/collection"
          element={
            token
              ? <Collection search={search} addToCart={addToCart} />
              : <Navigate to="/" />
          }
        />

        {/* ABOUT */}
        <Route
          path="/about"
          element={token ? <About /> : <Navigate to="/" />}
        />

        {/* CONTACT */}
        <Route
          path="/contact"
          element={token ? <Contact /> : <Navigate to="/" />}
        />

        {/* CART */}
        <Route
          path="/cart"
          element={
            token
              ? <Cart cart={cart} removeFromCart={removeFromCart} />
              : <Navigate to="/" />
          }
        />

        <Route
  path="/product/:id"
  element={<ProductDetails />}
/>

      </Routes>
    </>
  );
};

export default App;