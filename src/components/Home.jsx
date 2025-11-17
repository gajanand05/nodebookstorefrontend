import React, { useEffect, useState } from "react";
import "../App.css";

function Home({ searchQuery }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  useEffect(() => {
    fetch("http://localhost:3036/api/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      }) 
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  }, []);

  // Filter books by title, category or publisher
  const filteredBooks = books.filter((book) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    const title = (book.title || "").toLowerCase();
    const category = (book.category || "").toLowerCase();
    const publisher = (book.company || "").toLowerCase();

    return title.includes(query) || 
           category.includes(query) || 
           publisher.includes(query);
  });

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const staticImage = "/blue-book-cover_1101-39 (1).jpg";

  return (
    <div className="product-section">
      <section className="banner">
        <h1>Welcome to Our Bookstore</h1>
        <p>Discover amazing books and explore new worlds!</p>
      </section>

            {loading ? (
        <div className="loading">Loading books...</div>
      ) : (
        <>
          {searchQuery && (
            <div className="search-results-header">
              <h2>Search Results for "{searchQuery}"</h2>
              <p>{filteredBooks.length} books found</p>
            </div>
          )}
          
          <div className="product-grid">
            {currentBooks.length > 0 ? (
              currentBooks.map((book) => (
                <div key={book._id} className="product-card">
                  <img src={staticImage} alt={book.title} />
                  <div className="product-info">
                    <h3>{book.title}</h3>
                    <p className="category">Category: {book.category}</p>
                    <p className="company">Publisher: {book.company}</p>
                    <p className="price">${book.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No books found matching "{searchQuery}"</p>
                <p>Try searching by title, category, or publisher</p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={handlePrev} 
                disabled={currentPage === 1}
                className="pagination-button"
              >
                « Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`pagination-button ${currentPage === i + 1 ? "active" : ""}`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                onClick={handleNext} 
                disabled={currentPage === totalPages}
                className="pagination-button"
              >
                Next »
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
