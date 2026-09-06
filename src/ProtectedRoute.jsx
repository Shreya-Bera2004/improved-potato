import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const user = localStorage.getItem("loggedInUser");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;