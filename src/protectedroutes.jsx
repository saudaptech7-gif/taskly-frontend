import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { setUser, setLoading } from "./store/authSlice";

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();

  const { user, isLoggedIn, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/me", {
          method: "GET",
          credentials: "include",
        });

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
    return <p>Loading...</p>;
  }

  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
