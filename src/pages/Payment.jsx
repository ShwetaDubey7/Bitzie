import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = ({ cartItems = [], clearCart }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(cartItems);
  const [processing, setProcessing] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    const fetchCart = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to proceed.");
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch cart");
        }

        const data = await res.json();
        setCart(data.items || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    if (!cartItems || cartItems.length === 0) {
      fetchCart();
    }
  }, [cartItems, navigate]);
  
  const handlePayment = async (e) => {
    e.preventDefault();
  
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to proceed with payment.");
      return;
    }
  
    if (!cart || cart.length === 0) {
      alert("Your cart is empty! Add items first.");
      return;
    }

    setProcessing(true); 

    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
  
    try {
      const res = await fetch("http://localhost:5000/api/orders/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
        paymentMethod,
        totalAmount,
        items: cart.map((item) => ({
          name: item.name,
          price: item.price,
          imageUrl: item.imageUrl,
          quantity: item.quantity || 1,
        })),
      }),
    });
  
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Payment failed: ${errorText}`);
      }
  
      setPaymentConfirmed(true);
      clearCart();
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Payment failed! Try again.");
    } finally {
      setProcessing(false);
    }
  };
  
  
  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold text-purple">Payment</h2>

      <div className="card shadow-sm p-4" style={{ maxWidth: "500px", margin: "auto" }}>
      {!paymentConfirmed ? (
        <>
        <h4 className="fw-bold text-purple text-center">Choose Payment Method</h4>
        <select
              className="form-select mb-3"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              disabled={processing}
            >
              <option value="card">Credit / Debit Card</option>
              <option value="upi">UPI</option>
              <option value="cod">Cash on Delivery</option>
            </select>

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

              <button 
              type="submit" 
              className="btn w-100 mt-3" 
              style={{ backgroundColor: "#4B0082", color: "white" }}
              onClick={handlePayment}
              disabled={processing}
              >
                {processing ? "Processing Payment..." : `Pay ₹${cartItems.reduce((sum, item) => sum + item.price, 0)}`}
              </button>
          </>
        ) : (
          <div className="text-center">
            <h3 className="fw-bold text-success">Order Confirmed!</h3>
            <p>Your order has been Confirm.</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/")}
            >
              Go to Home
              </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
