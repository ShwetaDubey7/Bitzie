import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.name || !user.email || !user.password) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      sessionStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      alert("Registration successful!");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center fw-bold text-purple">Register</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold text-purple">Full Name</label>
            <input type="text" name="name" className="form-control" placeholder="Enter your full name" value={user.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold text-purple">Email</label>
            <input type="email" name="email" className="form-control" placeholder="Enter your email" value={user.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold text-purple">Password</label>
            <input type="password" name="password" className="form-control" placeholder="Enter your password" value={user.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn w-100" style={{ backgroundColor: "#4B0082", color: "white" }}>
            Register
          </button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <a href="/login" className="text-purple fw-bold">Login Here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
