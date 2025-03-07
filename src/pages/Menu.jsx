import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

const foodItems = [
  { id: 1, name: "Paneer Butter Masala", price: 250, imageUrl: "/images/paneerbuttermasala.jpg" },
  { id: 2, name: "Vegetable Biryani", price: 180, imageUrl: "/images/vegetablebiryani.jpg" },
  { id: 3, name: "Crispy Masala Dosa", price: 120, imageUrl: "/images/masaladosa.jpg" },
  { id: 4, name: "Pav Bhaji", price: 250, imageUrl: "/images/pavbhaji.jpg" },
  { id: 5, name: "Rajma Chawal", price: 180, imageUrl: "/images/rajmachawal.jpg" },
  { id: 6, name: "Chole Bhature", price: 120, imageUrl: "/images/cholebhature.jpg" },
];

const Menu = ({ fetchCart }) => {
  const [menuItems, setMenuItems] = useState(foodItems);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/menu");
        const data = await res.json();
        if (data.length > 0) {
          setMenuItems(data);
        }
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };
    fetchMenu();
  }, []);

  const handleAddToCart = async (food) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to add items to the cart!");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ name: food.name, price: food.price, imageUrl: food.imageUrl }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to add item to cart: ${errorText}`);
      }
  
      alert("Item added to cart!");
      fetchCart();
    } catch (error) {
      console.error("Failed to add item:", error);
      alert(error.message);
    }
  };

  const filteredItems = menuItems.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));


  return (
    <div className="container py-4">
      <h2 className="text-center fw-bold text-purple">Explore Our Menu</h2>
      
      {/* Search Bar */}
      <div className="d-flex gap-3 mb-4 w-100 justify-content-center flex-wrap">
        <div className="input-group" style={{ maxWidth: "300px" }}>
          <span className="input-group-text bg-white border-2" style={{ borderColor: "#8A2BE2" }}>
            <FaMapMarkerAlt className="text-purple" />
          </span>
          <input type="text" className="form-control border-2" style={{ borderColor: "#8A2BE2" }} placeholder="Enter your location" />
        </div>
        <div className="input-group" style={{ maxWidth: "300px" }}>
          <input
            type="text"
            className="form-control border-2"
            style={{ borderColor: "#8A2BE2" }}
            placeholder="Search for food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-purple text-white">
            <FaSearch />
          </button>
        </div>
      </div>

      <div className="row g-4 w-100 d-flex justify-content-center">
        {filteredItems.length > 0 ? (
          filteredItems.map((food) => (
            <div key={food._id} className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center">
              <div className="card p-3 shadow-lg" style={{ maxWidth: "300px", width: "100%" }}>
                <img
                  src={food.imageUrl.startsWith("/") ? food.imageUrl : `/images/${food.imageUrl}`}
                  className="card-img-top img-fluid rounded"
                  alt={food.name}
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) => { console.error("Image failed to load:", e.target.src);
                    e.target.src = "/images/placeholder.jpg"; }}
                />
                <div className="card-body text-center">
                  <h5 className="fw-bold text-purple">{food.name}</h5>
                  <p className="fw-bold text-purple">₹{food.price}</p>
                  <button className="btn w-100" style={{ backgroundColor: "#4B0082", color: "white" }} onClick={() => handleAddToCart(food)}>
                    Add to Cart 🛒
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No items found.</p>
        )}
      </div>
    </div>
  );
};

export default Menu;
