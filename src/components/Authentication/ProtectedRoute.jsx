import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token"); // check login token
  if (!token) {
    toast.error("please login to proceed", {
          position: "top-right",
          autoClose: 3000,
        });
    return <Navigate to="/Login" replace />; // redirect to login if not logged in
  }
  return children;
};

export default ProtectedRoute;
