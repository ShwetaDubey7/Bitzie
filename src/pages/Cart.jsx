import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Cart = ({ setCartCount }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(updatedCart);
      setCartCount(updatedCart.length);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [setCartCount]);

  const handleRemoveFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    localStorage.setItem("cartCount", updatedCart.length);
    setCartCount(updatedCart.length);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="container py-4">
      <h2 className="text-center fw-bold text-purple">🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-purple">Your cart is empty!</p>
      ) : (
        <div className="row g-3 justify-content-center">
          {cartItems.map((item, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center">
              <div className="card shadow-sm border-0 w-100" style={{ backgroundColor: "#E6E6FA" }}>
                <img src={item.imageUrl} className="card-img-top img-fluid" alt={item.name} style={{ height: "200px", objectFit: "cover" }} />
                <div className="card-body text-center">
                  <h5 className="fw-bold text-purple">{item.name}</h5>
                  <p className="fw-bold text-purple">₹{item.price}</p>
                  <button
                    className="btn w-100"
                    style={{ backgroundColor: "#4B0082", color: "white" }}
                    onClick={() => handleRemoveFromCart(index)}
                  >
                    Remove ❌
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
