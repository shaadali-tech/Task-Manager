import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../api/firebase";

function RequireAuth({ children }) {
  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setChecking(false);
    });

    return () => unsub();
  }, []);

  if (checking) return <div>Loading...</div>;

  if (!user) return <Navigate to="/" replace />;

  return children;
}

export default RequireAuth;
