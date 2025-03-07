import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Cart = ({ setCartCount }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          console.error("No token found, user not logged in");
          return;
        }
    
        const res = await fetch("http://localhost:5000/api/cart", {
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` },
        });
    
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to fetch cart: ${errorText}`);
        }
    
        const data = await res.json();
        setCartItems(data.items || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };    
    fetchCart();
  }, []);
  

  // Remove item from cart
  const handleRemoveFromCart = async (itemId) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Please log in to remove items!");
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to remove item: ${errorText}`);
      }
  
      alert("Item removed from cart!");
      setCartItems((prevCart) => prevCart.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };
  

  return (
    <div className="container py-4">
      <h2 className="text-center fw-bold text-purple">🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-purple">Your cart is empty!</p>
      ) : (
        <div className="row g-3 justify-content-center">
          {cartItems.map((item) => (
            <div key={item._id} className="col-md-6 col-lg-4 col-sm-12 d-flex justify-content-center">
              <div className="card shadow-sm border-0 w-100" style={{ backgroundColor: "#E6E6FA" }}>
                <img src={item.imageUrl} className="card-img-top img-fluid" alt={item.name} style={{ height: "200px", objectFit: "cover" }} />
                <div className="card-body text-center">
                  <h5 className="fw-bold text-purple">{item.name}</h5>
                  <p className="fw-bold text-purple">₹{item.price}</p>
                  <button
                    className="btn w-100"
                    style={{ backgroundColor: "#4B0082", color: "white" }}
                    onClick={() => handleRemoveFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="text-center mt-4">
          <button
            className="btn w-100"
            style={{ backgroundColor: "#4B0082", color: "white" }}
            onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
