import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import './llogin.css';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post(`${process.env.REACT_APP_URL}/login`, {
          email,
          password,
        })
        .then((res) => {
          if (res.data === "exist") {
            navigate("/list");
          } else if (res.data === "notexist") {
            alert("User has not signed up");
          }
        })
        .catch((e) => {
          alert("Wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="login-container">
      <h1>Login</h1>

      <form>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" onClick={submit}>
          Login
        </button>
      </form>

      <div className="separator">
        <span>OR</span>
      </div>

      <Link to="/signup">Signup Page</Link>
    </div>
  );
}

export default Login;
