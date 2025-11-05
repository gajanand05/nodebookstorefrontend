import React, { useState } from "react";
import "./../Admin.css";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    company: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3036/api/addbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.name,
          category: formData.category,
          price: formData.price,
          company: formData.company,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("✅ Product added successfully!");
        setFormData({ name: "", category: "", price: "", company: "" });
      } else {
        alert("❌ Error: " + result.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("❌ Server Error: " + error.message);
    }
  };

  return (
    <div className="add-product-form-container">
      <h2>Add New Product</h2>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Category:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Fiction">Fiction</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Biography">Biography</option>
          </select>
        </label>

        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Company:
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="submit-btn">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
