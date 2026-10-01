import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setUser } from "../store/authSlice";
import api from "../api/api";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    // Agar login request already chal rahi hai
    // to dobara request nahi jayegi
    if (loading) return;

    setLoading(true);

    try {
      const response = await api.auth.login({
        email,
        password,
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(setUser(data.user));

        navigate("/home");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Login Error:", error);
      alert("Something went wrong");
    } finally {
      // Request complete hone ke baad button active ho jayega
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleLogin}>
        <h1>Login</h1>

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
          className={loading ? "login-btn loading" : "login-btn"}
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Signup</span>
        </p>
      </form>
    </div>
  );
}

export default Login;

