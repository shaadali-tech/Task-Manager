import { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../api/firebase";

function Register() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      alert("User Registered");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1>Register</h1>

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

      <button onClick={handleRegister}>Register</button>
    </>
  );
}

export default Register;
