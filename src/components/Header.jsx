import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../store/authSlice";
import api from "../api/api";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await api.auth.logout();

      const data = await response.json();

      if (response.ok) {
        // Redux se user logout
        dispatch(logout());

        // Login page par redirect
        navigate("/login");
      } else {
        console.log("Logout Error:", data.message);
      }
    } catch (error) {
      console.log("Logout Error:", error);
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <div className="logo-box">✓</div>
        <span>Taskly</span>
      </div>

      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}

export default Header;

