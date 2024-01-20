import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate(); // this is an effect, effect belong in useEffect

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  // this shouldn't add any uncessary jsx element to children
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
