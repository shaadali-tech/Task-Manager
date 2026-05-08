import { Navigate } from "react-router-dom";

import { auth } from "../api/firebase";

function RequireAuth({ children }) {
  const user = auth.currentUser;

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}

export default RequireAuth;
