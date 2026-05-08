import { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../api/firebase";

import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </>
  );
}

export default Login;
