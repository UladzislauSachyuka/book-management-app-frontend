import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const user = localStorage.getItem("user");

  return user ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
