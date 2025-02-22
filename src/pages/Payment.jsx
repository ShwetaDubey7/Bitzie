import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = ({ cartItems, clearCart }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handlePayment = (e) => {
    e.preventDefault();
    alert(`Payment successful via ${paymentMethod}`);
    clearCart(); // Clear cart after successful payment
    localStorage.setItem("cart", JSON.stringify([]));
    navigate("/");
  };

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold text-purple">Payment</h2>

      <div className="card shadow-sm p-4" style={{ maxWidth: "500px", margin: "auto" }}>
        <h4 className="fw-bold text-purple text-center">Choose Payment Method</h4>
        <form onSubmit={handlePayment}>
          <div className="mb-3">
            <label className="form-label fw-bold text-purple">Payment Options</label>
            <select className="form-select" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
              <option value="card">Credit / Debit Card</option>
              <option value="upi">UPI</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>

          {paymentMethod === "card" && (
            <div>
              <label className="form-label fw-bold text-purple">Card Details</label>
              <input type="text" className="form-control mb-3" placeholder="Card Number" required />
              <input type="text" className="form-control mb-3" placeholder="Expiry Date (MM/YY)" required />
              <input type="text" className="form-control mb-3" placeholder="CVV" required />
            </div>
          )}

          {paymentMethod === "upi" && (
            <div>
              <label className="form-label fw-bold text-purple">Enter UPI ID</label>
              <input type="text" className="form-control" placeholder="example@upi" required />
            </div>
          )}

          <button type="submit" className="btn w-100 mt-3" style={{ backgroundColor: "#4B0082", color: "white" }}>
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
