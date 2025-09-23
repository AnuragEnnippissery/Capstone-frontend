import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

function Login() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");   // 👈 state for error messages
  let navigate = useNavigate();

  async function HandleLogin() {
    setError(""); // clear old error
    try {
      const res = await fetch("https://capstone-backend-xhtk.onrender.com/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      console.log("Response from server:", data);

      if (res.ok) {
        // ✅ login success
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("id", data.id);
        sessionStorage.setItem("token", data.token);

        window.dispatchEvent(new Event("storage"));
        navigate("/");
        toast.success(`${username} logged in `, {
          position: "top-right",
          autoClose: 3000,
        });

      } else {
        // ❌ login failed
        setError(data.message || "Invalid username or password");
        toast.error(data.message || "Invalid username or password!");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  }

  function HandleCLick() {
    navigate("/Register");
  }

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Login</h2>
      <input
        type="text"
        id="username"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ margin: "10px", padding: "8px" }}
      />
      <br />
      <input
        type="password"  // 👈 fix: should be password type
        id="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: "10px", padding: "8px" }}
      />
      <br />
      <button onClick={HandleLogin} style={{ margin: "10px", padding: "8px" }}>
        Login
      </button>
      <br />
      {error && (   // 👈 show inline error if exists
        <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
      )}
      <small>
        Don't have an account?{" "}
        <button
          onClick={HandleCLick}
          style={{
            color: "blue",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </small>
    </div>
  );
}

export default Login;
