import { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../api/firebase";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);

      toast.success("User registered successfully!");
      navigate("/");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container gradient-green">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p>Sign up to get started</p>

        <div className="form-group">
          <div>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="Min 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="btn btn-primary"
            style={{
              background: loading
                ? "#9ca3af"
                : "linear-gradient(to right, #16a34a, #15803d)",
            }}
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </div>

        <div className="divider"></div>
        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/" style={{ color: "#16a34a" }}>
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
