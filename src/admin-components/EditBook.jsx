import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    company: "",
    price: "",
  });

  useEffect(() => {
    fetch(`http://localhost:3036/api/getbook/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.error("Error fetching book:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3036/api/updatebook/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Book updated successfully!");
        navigate("/dashboard/products");
      })
      .catch((err) => console.error("Error updating book:", err));
  };

  return (
    <div className="add-product-form-container">
      <h2>Edit Book</h2>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
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

        <button type="submit" className="add-product-btn">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditBook;
