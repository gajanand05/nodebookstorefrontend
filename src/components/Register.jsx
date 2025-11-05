import React, { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // basic validation
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setErrors("All fields are required.");
      return;
    }

    if (form.password.length < 6) {
      setErrors("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrors("Passwords do not match.");
      return;
    }
    // submit to server
      fetch("http://localhost:3036/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
            setSuccess("Registration successful. You are now logged in.");
            // store token
            if (data.token) {
              localStorage.setItem("authToken", data.token);
            }
          setForm({ name: "", email: "", password: "", confirmPassword: "" });
        } else {
          setErrors(data.message || "Registration failed.");
        }
      })
      .catch((err) => {
        console.error(err);
        setErrors("Server error. Please try again later.");
      });
  }; 

  return (
    <div className="register-container">
      <h2>Create account</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Re-type Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {errors && <p className="form-error">{errors}</p>}
        {success && <p className="form-success">{success}</p>}

        <button type="submit" className="btn">Register</button>
      </form>

      <style jsx>{`
        .register-container { max-width: 480px; margin: 1rem auto; padding: 1rem; }
        .form-group { margin-bottom: 0.75rem; }
        label { display: block; margin-bottom: 0.25rem; }
        input { width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 4px; }
        .form-error { color: #b91c1c; }
        .form-success { color: #065f46; }
      `}</style>
    </div>
  );
}
