import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = ({ cartItems = [], clearCart  }) => {
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState({ name: "", email: "", address: "", phone: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  const handleChange = (e) => {
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!customerDetails.name || !customerDetails.email || !customerDetails.address || !customerDetails.phone) {
      alert("Please fill in all the details!");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      alert("Order placed successfully!");
      clearCart();
      navigate("/payment");
    }, 2000);
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container d-flex justify-content-center align-items-center py-5">
      <div className="card p-4 shadow-lg w-100" style={{ maxWidth: "500px" }}>
        <h2 className="text-center fw-bold text-purple">Checkout</h2>
        <h4 className="fw-bold text-purple text-center">Your Order Summary</h4>
        {cartItems.length === 0 ? (
          <p className="text-center">Your cart is empty! Redirecting...</p>
        ) : (
          <>
            <ul className="list-group mb-3">
              {cartItems.map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <img src={item.imageUrl} alt={item.name} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }} />
                  {item.name} <span className="fw-bold text-purple">₹{item.price}</span>
                </li>
              ))}
            </ul>
          </>
        )}
        <h5 className="fw-bold text-purple text-center">Total: ₹{totalAmount}</h5>
        <h4 className="fw-bold text-purple text-center mt-3">Customer Details</h4>
        <form onSubmit={handleCheckout}>
          <div className="mb-3">
            <label className="form-label fw-bold text-purple">Full Name</label>
            <input type="text" name="name" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold text-purple">Email</label>
            <input type="email" name="email" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold text-purple">Phone Number</label>
            <input type="tel" name="phone" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold text-purple">Delivery Address</label>
            <textarea name="address" className="form-control" rows="3" onChange={handleChange} required></textarea>
          </div>
          <button type="submit" className="btn w-100" style={{ backgroundColor: "#4B0082", color: "white" }} disabled={loading}>
            {loading ? "Processing..." : "Proceed to Pay"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
