import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
      });

      dispatch(logout());
      navigate("/login");
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
