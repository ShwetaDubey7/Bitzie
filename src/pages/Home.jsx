import { Link } from "react-router-dom";
import { useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaBars, FaShoppingCart } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = ({ isLoggedIn, handleLogout, cartCount }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="container-fluid p-0" style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* SEO Meta Tags */}
      <head>
        <meta name="description" content="Order your favorite meals and get them delivered fast!" />
        <meta name="keywords" content="food, dosa, pav bhaji, Masala Dosa, Chole Bhature, Bhature, Chole, Rajma, Rajma Chawal, Biryani, Veg Biryani, pav, paneer, Paneer Tikka, Masala" />
      </head>
      
      {/* Navbar Section */}
      <nav className="navbar navbar-expand-lg px-4 shadow-sm" style={{ backgroundColor: "#E6E6FA" }}>
        <div className="container-fluid d-flex justify-content-between">
          <Link className="navbar-brand fw-italic fs-3 text-purple" to="/">
            Welcome to Bitzie express! 
          </Link>
          
          {/* Search Bar & Location */}
          <div className="d-flex align-items-center gap-3">
            <div className="input-group" style={{ maxWidth: "300px" }}>
              <span className="input-group-text bg-white border-2" style={{ borderColor: "#8A2BE2" }}>
                <FaMapMarkerAlt className="text-purple" />
              </span>
              <input
                type="text"
                className="form-control border-2"
                style={{ borderColor: "#8A2BE2" }}
                placeholder="Enter your location"
              />
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
              <button className="btn btn-purple text-white"><FaSearch /></button>
            </div>
            <Link to="/cart" className="position-relative text-dark">
              <FaShoppingCart size={24} className="cart-icon" />
              {cartCount > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-circle">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <header className="text-center text-white d-flex flex-column justify-content-center align-items-center" style={{ background: "url('/images/Bitzie.jpg') center/cover no-repeat", height: "90vh" }}>
        <h1 className="fw-bold display-3 text-shadow">Discover the Best Food Near You</h1>
        <p className="lead text-shadow">Order your favorite meals and get them delivered in minutes!</p>
        <Link to="/menu" className="btn btn-lg text-white fw-bold" style={{ backgroundColor: "#4B0082" }}>
          Browse Menu
        </Link>
      </header>
      
     {/* Featured Categories */}
<section className="container my-5">
  <h2 className="text-center fw-bold text-purple mb-4">Popular Categories</h2>
  <div className="row g-4">
    {[
      { name: "Pizza", image: "/images/pizza.jpg" },
      { name: "Biryani", image: "/images/vegetablebiryani.jpg" },
      { name: "Burgers", image: "/images/burger.jpg" },
      { name: "Desserts", image: "/images/desserts.jpg" },
      { name: "South Indian", image: "/images/southindian.jpg" },
      { name: "Beverages", image: "/images/beverages.jpg" }
    ].map((category, index) => (
      <div key={index} className="col-lg-2 col-md-4 col-6 text-center">
        <div 
          className="card shadow-sm border-0 p-3 d-flex flex-column align-items-center" 
          style={{ backgroundColor: "#E6E6FA" }}
        >
          <img 
            src={category.image} 
            alt={`${category.name} category`} 
            className="rounded-circle mb-2"
            style={{ width: "100px", height: "100px", objectFit: "cover", display: "block" }}
          />
          <h6 className="fw-bold text-purple text-center">{category.name}</h6>
        </div>
      </div>
    ))}
  </div>
</section>

      
      {/* Footer */}
      <footer className="text-center p-3 text-white" style={{ backgroundColor: "#4B0082" }}>
        <p className="mb-0">© 2024 Bitzie. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
