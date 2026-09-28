import { Routes, Route, Navigate } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import TaskDetails from "./pages/Taskdetails";
import ProtectedRoute from "./protectedroutes";
// import { useSelector } from "react-redux";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/task/:id"
        element={
          <ProtectedRoute>
            <TaskDetails />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
