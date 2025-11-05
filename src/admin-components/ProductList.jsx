import React, { useEffect, useState } from "react";
import "./../Admin.css";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5; // show 10 products per page

  // Fetch books from backend
  useEffect(() => {
    fetch("http://localhost:3036/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  // Filter books based on search input
  const filteredBooks = books.filter( 
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredBooks.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredBooks.length / productsPerPage);


  const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this product?")) {
    fetch(`http://localhost:3036/api/deletebook/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        // Remove the deleted book from state
        setBooks(books.filter((book) => book._id !== id));
      })
      .catch((err) => console.error("Error deleting book:", err));
  }
};


  return (
    <div className="product-list-container">
      <div className="header">
        <h2>Product List</h2>
        <button className="add-product-btn">
          <Link to="/dashboard/addproduct">Add Product</Link>
        </button>
      </div>

      <input
        type="text"
        placeholder="Search products..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // reset to first page when searching
        }}
      />

      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price ($)</th>
            <th>Company</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((book,index) => (
           
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.category}</td>
              <td>{book.price}</td>
              <td>{book.company}</td>
              <td>
                 <Link to={`/dashboard/edit/${book._id}`}>
                <button className="edit-btn">Edit</button>
                </Link>

                 <button
                className="delete-btn"
                onClick={() => handleDelete(book._id)}
              >
                Delete
              </button>
              </td>
            </tr>
          ))}
          {currentProducts.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Dynamic Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx + 1}
            onClick={() => setCurrentPage(idx + 1)}
            className={currentPage === idx + 1 ? "active-page" : ""}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
