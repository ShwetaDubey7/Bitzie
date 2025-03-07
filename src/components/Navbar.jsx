import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars } from "react-icons/fa";

const Navbar = ({ cartItems }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg p-3 shadow-sm" style={{ backgroundColor: "#E6E6FA" }}>
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand fw-bold" to="/" style={{ color: "#4B0082" }}>
          Bitzie
        </Link>

        {/* Mobile Menu Button */}
        <button className="btn btn-light border-0" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars size={24} />
        </button>
        
        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="position-absolute end-0 bg-white shadow p-3 rounded" style={{ top: "50px", right: "10px", zIndex: 1000 }}>
            <ul className="list-unstyled mb-0">
              <li><Link to="/menu" className="text-dark text-decoration-none d-block py-1">Menu</Link></li>
              <li><Link to="/cart" className="text-dark text-decoration-none d-block py-1">Cart</Link></li>
              <li><Link to="/checkout" className="text-dark text-decoration-none d-block py-1">Checkout</Link></li>
              <li><Link to="/payment" className="text-dark text-decoration-none d-block py-1">Payment</Link></li>
              {isLoggedIn ? (
                <li>
                  <button className="btn text-danger text-decoration-none d-block w-100 text-start py-1" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              ) : (
                <li><Link to="/register" className="text-dark text-decoration-none d-block py-1">Register / Login</Link></li>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
