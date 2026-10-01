import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { setUser, setLoading } from "./store/authSlice";
import api from "./api/api";

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();

  const { user, isLoggedIn, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.auth.me();

        const data = await response.json();

        if (response.ok) {
          dispatch(setUser(data.user));
        } else {
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log("Auth Check Error:", error);
        dispatch(setLoading(false));
      }
    };

    if (!isLoggedIn && !user) {
      checkAuth();
    } else {
      dispatch(setLoading(false));
    }
  }, [dispatch, isLoggedIn, user]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="taskly-loader">
          <div className="taskly-logo">✓</div>
        </div>

        <h2>Taskly</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
