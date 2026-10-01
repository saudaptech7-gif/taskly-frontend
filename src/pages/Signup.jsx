import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/api";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    // Agar request already chal rahi hai to dobara request nahi jayegi
    if (loading) return;

    setLoading(true);

    try {
      const response = await api.auth.signup({
        name,
        email,
        password,
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Signup Error:", error);
      alert("Something went wrong");
    } finally {
      // Request complete hone ke baad button wapas active ho jayega
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSignup}>
        <h1>Create Account</h1>

        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className={loading ? "signup-btn loading" : "signup-btn"}
        >
          {loading ? "Loading..." : "Signup"}
        </button>

        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </form>
    </div>
  );
}

export default Signup;