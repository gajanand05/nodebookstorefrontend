import React from "react";

function AboutUs() {
  return (
    <div className="about-page">
      {/* Top Banner */}
      <section className="about-banner">
        <h1>About Us</h1>
        <p>Discover the story behind our bookstore</p>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-container">
          {/* Left Side Image */}
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600"
              alt="Bookstore Interior"
            />
          </div>

          {/* Right Side Content */}
          <div className="about-content">
            <h2>Welcome to Our Bookstore</h2>
            <p>
              At <strong>BookNest</strong>, we believe every book opens a door
              to a new world. Our passion lies in connecting readers with
              stories that inspire, educate, and entertain. From timeless
              classics to modern bestsellers, our curated collection has
              something for every reader.
            </p>
            <p>
              Whether you’re an avid reader or just discovering the joy of
              books, our mission is to make your reading experience delightful.
              We host book signings, reading sessions, and community events to
              keep the love for books alive.
            </p>
            <p>
              Come visit us and explore a world of imagination waiting for you
              on every shelf.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs; 