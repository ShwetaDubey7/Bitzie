import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Payment from "./pages/Payment.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        headers: { "Authorization": `Bearer ${sessionStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();
      setCartItems(data.items || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${sessionStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error("Failed to clear cart");
      fetchCart();
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };
  
  return (
    <Router>
      <Navbar cartItems={cartItems.length} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
        {isLoggedIn ? (
          <>
            <Route path="/menu" element={<Menu fetchCart={fetchCart} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} fetchCart={fetchCart}/>} />
            <Route path="/checkout" element={<Checkout cartItems={cartItems} clearCart={clearCart} />} />
            <Route path="/payment" element={<Payment cartItems={cartItems} clearCart={clearCart} />} />
          </>
        ) : (
          
            <>
            <Route path="/menu" element={<Navigate to="/login" />} />
            <Route path="/cart" element={<Navigate to="/login" />} />
            <Route path="/checkout" element={<Navigate to="/login" />} />
            <Route path="/payment" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}
export default App;
