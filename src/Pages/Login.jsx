import { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";

import { auth, googleProvider } from "../api/firebase";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container gradient-blue">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p>Sign in to your account</p>

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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="btn btn-secondary"
          style={{
            marginTop: "12px",
            backgroundColor: "#ffffff",
            padding: "10px 20px",
            marginLeft: "110px",
            hover: {
              backgroundColor: "#f3f4f6",
            },
            color: "#1f2937",
            border: "1px solid #d1d5db",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
          }}
        >
          Google Login
        </button>

        <div className="divider"></div>
        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
