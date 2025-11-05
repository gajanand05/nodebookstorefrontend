import React, { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return;
    }

    fetch("http://localhost:3036/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email, password: form.password })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.token) {
          localStorage.setItem("authToken", data.token);
          setSuccess("Login successful.");
          setForm({ email: "", password: "" });
        } else {
          setError(data.message || "Login failed.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Server error. Please try again later.");
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={form.password} onChange={handleChange} required />
        </div>

        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">{success}</p>}

        <button type="submit" className="btn">Login</button>
      </form>

      <style jsx>{`
        .login-container { max-width: 420px; margin: 1rem auto; padding: 1rem; }
        .form-group { margin-bottom: 0.75rem; }
        label { display: block; margin-bottom: 0.25rem; }
        input { width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 4px; }
        .form-error { color: #b91c1c; }
        .form-success { color: #065f46; }
      `}</style>
    </div>
  );
}
