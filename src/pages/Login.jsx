import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));
    if (!registeredUser) {
      setError("No user found! Please register first.");
      return;
    }
    if (registeredUser.email === email && registeredUser.password === password) {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      navigate("/");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center fw-bold text-purple">Login</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-bold text-purple">Email</label>
            <input type="email" className="form-control" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold text-purple">Password</label>
            <input type="password" className="form-control" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn w-100" style={{ backgroundColor: "#4B0082", color: "white" }}>
            Login
          </button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <a href="/register" className="text-purple fw-bold">Register Here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
