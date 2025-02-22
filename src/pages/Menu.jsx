import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";

const foodItems = [
  { id: 1, name: "Paneer Butter Masala", price: 250, imageUrl: "/images/paneerbuttermasala.jpg" },
  { id: 2, name: "Vegetable Biryani", price: 180, imageUrl: "/images/vegetablebiryani.jpg" },
  { id: 3, name: "Crispy Masala Dosa", price: 120, imageUrl: "/images/masaladosa.jpg" },
  { id: 4, name: "Pav Bhaji", price: 250, imageUrl: "/images/pavbhaji.jpg" },
  { id: 5, name: "Rajma Chawal", price: 180, imageUrl: "/images/rajmachawal.jpg" },
  { id: 6, name: "Chole Bhature", price: 120, imageUrl: "/images/cholebhature.jpg" },
];

const Menu = ({ addToCart }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = foodItems.filter((food) =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container d-flex flex-column align-items-center py-5">
      {/* Search & Location Bar */}
      <div className="d-flex gap-3 mb-4 w-100 justify-content-center">
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
      
      <h2 className="text-purple fw-bold text-center mb-4">Spotlight On Menu</h2>
      <div className="row g-4 w-100 d-flex justify-content-center">
        {filteredItems.map((food) => (
          <div key={food.id} className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center">
            <div className="card p-3 shadow-lg" style={{ maxWidth: "300px", width: "100%" }}>
              <img
                src={food.imageUrl}
                className="card-img-top img-fluid rounded"
                alt={food.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="fw-bold text-purple">{food.name}</h5>
                <p className="fw-bold text-purple">₹{food.price}</p>
                <button className="btn w-100" style={{ backgroundColor: "#4B0082", color: "white" }} onClick={() => addToCart(food)}>
                  Add to Cart 🛒
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
