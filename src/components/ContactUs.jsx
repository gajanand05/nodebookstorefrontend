import React, { useState } from "react";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [status, setStatus] = useState(""); // success/error message

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3036/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Server error. Please try again later.");
    }
  };

  return (
    <div className="contact-section">
      {/* Left Side - Info */}
      <div className="contact-info">
        <img src="./contact.jpeg" alt="Contact" className="info-img" />
        <h2>Get in Touch</h2>
        <p>If you have any questions, feel free to contact us anytime. We’re here to help!</p>
        <div className="info-details">
          <p><strong>Email:</strong> support@example.com</p>
          <p><strong>Phone:</strong> +1 (555) 123-4567</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="contact-form-container">
        <h2>Send a Message</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Write your message"
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="btn">Send Message</button>
        </form>

        {status && <p className="status-message">{status}</p>}
      </div>
    </div>
  );
}

export default ContactUs;
