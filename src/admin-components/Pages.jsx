import React from "react";
import "./../Admin.css";

const Pages = () => {
  return (
    <div className="pages-container">
      {/* Header */}
      <div className="pages-header">
        <h2>Pages</h2>
        <button className="add-page-btn">Add Page</button>
      </div>

      {/* Add Page Form */}
      <div className="add-page-form-container">
        <h3>Add New Page</h3>
        <form className="add-page-form">
          <label>
            Title:
            <input type="text" name="title" placeholder="Enter page title" required />
          </label>

          <label>
            Slug:
            <input type="text" name="slug" placeholder="Enter page slug" required />
          </label>

          <label>
            Content:
            <textarea name="content" placeholder="Enter page content" rows="5" required></textarea>
          </label>

          <button type="submit" className="submit-btn">
            Add Page
          </button>
        </form>
      </div>

      {/* Pages Table */}
      <div className="pages-table-container">
        <table className="pages-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>About Us</td>
              <td>about-us</td>
              <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Contact Us</td>
              <td>contact-us</td>
              <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Privacy Policy</td>
              <td>privacy-policy</td>
              <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Terms & Conditions</td>
              <td>terms-conditions</td>
              <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pages;